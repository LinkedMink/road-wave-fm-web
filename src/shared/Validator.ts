import React from 'react';
import { LogService } from './LogService';
import { isArray, isString } from './TypeCheck';

const logger = LogService.get('Validator');

export enum ValidationRuleType {
  Required,
  Email,
  Length,
  Range,
  Compare,
  Json,
  Function,
}

export type ValidationRule = [ValidationRuleType, ...unknown[]];

export interface FieldRules {
  label: string;
  rules: ValidationRule[];
}

export interface FieldResult {
  isInvalid: boolean;
  message: string;
}

export type ValidationRules<T> = Record<keyof T, FieldRules | never>;

export interface ValidationResult<T> {
  isValid: boolean;
  errors: Record<keyof T, FieldResult>;
}

export interface FormComponentState<T extends object> {
  fields: Record<keyof T, unknown>;
  errors: Record<keyof T, FieldResult>;
}

export enum Comparison {
  Greater = 0,
  GreaterOrEqual = 1,
  Equal = 2,
  LessOrEqual = 3,
  Less = 4,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const hasValidationErrors = <T extends object>(
  errors: Record<keyof T, FieldResult | never>,
): boolean => Object.keys(errors).some((e) => errors[e as keyof T].isInvalid);

export class Validator<T extends object> {
  constructor(private readonly rules: ValidationRules<T>) {}

  getDefaultErrorState = (): Record<keyof T, FieldResult> => {
    const errorState = {} as Record<keyof T, FieldResult>;
    for (const key of Object.keys(this.rules)) {
      errorState[key as keyof T] = {
        isInvalid: false,
        message: '',
      };
    }
    return errorState;
  };

  validate = (fields: Record<keyof T, unknown>): ValidationResult<T> => {
    let isValid = true;
    const errors = {} as Record<keyof T, FieldResult>;

    for (const [property, fieldRules] of Object.entries(this.rules)) {
      const field = fieldRules as FieldRules;
      const invalidRule = field.rules.find(rule => {
        const error = this.validateRule(property as keyof T, rule, fields);
        if (error) {
          errors[property as keyof T] = { isInvalid: true, message: error };
          isValid = false;
          return true;
        }
      })

      if (!invalidRule) {
        errors[property as keyof T] = { isInvalid: false, message: '' };
      }
    }

    return { isValid, errors };
  };

  validateRule = (property: keyof T, rule: ValidationRule, fields: Record<keyof T, unknown>): string | void => {
    const label = this.rules[property].label;
    const value = fields[property];
    const ruleType = isArray(rule) ? rule[0] : rule;

    switch (ruleType) {
      case ValidationRuleType.Required: {
        if (value === undefined || value === null || value === '') {
          return `${label} is required`;
        }
        return;
      }
      case ValidationRuleType.Email: {
        if (typeof value !== 'string' || value.trim() === '') return;
        if (!EMAIL_REGEX.test(value)) {
          return `${label} must be an email address`;
        }
        return;
      }
      case ValidationRuleType.Length: {
        if (typeof value !== 'string' || value.trim() === '') return;
        const min = rule[1] as number;
        const max = rule[2] as number;
        if (min !== undefined && value.length < min) {
          return `${label} must be longer than ${min} characters`;
        }
        if (max !== undefined && value.length > max) {
          return `${label} must be shorter than ${max} characters`;
        }
        return;
      }
      case ValidationRuleType.Range: {
        if (typeof value !== 'string' || value.trim() === '') return;
        const min = rule[1] as number;
        const max = rule[2] as number;
        if (min !== undefined && Number(value) < min) {
          return `${label} must be greater than ${min}`;
        }
        if (max !== undefined && Number(value) > max) {
          return `${label} must be less than ${max}`;
        }
        return;
      }
      case ValidationRuleType.Compare: {
        const compareProperty = rule[1] as keyof T;
        const order = rule[2] ? (rule[2] as Comparison) : Comparison.Equal;
        const compareTo = fields[compareProperty];

        if (value !== compareTo) {
          if (order === Comparison.Equal) {
            return `${label} must match ${this.rules[compareProperty].label}`;
          } else if (order === Comparison.GreaterOrEqual && value < compareTo) {
            return `${label} must be greater than or equal ${this.rules[compareProperty].label}`;
          } else if (order === Comparison.LessOrEqual && value > compareTo) {
            return `${label} must be less than or equal ${this.rules[compareProperty].label}`;
          }
        } else {
          if (order === Comparison.Greater && value <= compareTo) {
            return `${label} must be greater than ${this.rules[compareProperty].label}`;
          } else if (order === Comparison.Less && value >= compareTo) {
            return `${label} must be less than ${this.rules[compareProperty].label}`;
          }
        }
        return;
      }
      case ValidationRuleType.Json: {
        if (!isString(value)) {
          return `${label} must be valid JSON`;
        }

        if (value.trim() === '') return;
        try {
          JSON.parse(value);
        } catch (e) {
          return `${label} must be valid JSON`;
        }
        return;
      }
      case ValidationRuleType.Function: {
        const validateFunction = rule[1] as () => string;
        return validateFunction();
      }
      default: {
        logger.warn(`Validation rule not supported: ${ruleType}`);
        return;
      }
    }
  };
}
