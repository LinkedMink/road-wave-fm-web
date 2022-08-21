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

export type ValidationRules<TField extends string = string> = Record<TField, FieldRules | never>;

export interface ValidationResult<TField extends string = string> {
  isValid: boolean;
  errors: Record<TField, FieldResult>;
}

export interface FormComponentState<TField extends string = string> {
  fields: Record<TField, unknown>;
  errors: Record<TField, FieldResult>;
}

export enum Comparison {
  Greater = 0,
  GreaterOrEqual = 1,
  Equal = 2,
  LessOrEqual = 3,
  Less = 4,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const hasValidationErrors = <TField extends string = string>(
  errors: Record<TField, FieldResult | never>
): boolean => Object.keys(errors).some(e => errors[e as TField].isInvalid);

export class Validator<TField extends string = string> {
  constructor(private readonly rules: ValidationRules<TField>) {}

  getDefaultErrorState = (): Record<TField, FieldResult> => {
    const errorState = {} as Record<TField, FieldResult>;
    for (const key of Object.keys(this.rules)) {
      errorState[key as TField] = {
        isInvalid: false,
        message: '',
      };
    }
    return errorState;
  };

  validate = (fields: Record<TField, unknown>): ValidationResult<TField> => {
    let isValid = true;
    const errors = {} as Record<TField, FieldResult>;

    for (const [property, fieldRules] of Object.entries(this.rules)) {
      const field = fieldRules as FieldRules;
      const invalidRule = field.rules.find(rule => {
        const error = this.validateRule(property as TField, rule, fields);
        if (error) {
          errors[property as TField] = { isInvalid: true, message: error };
          isValid = false;
          return true;
        }
      });

      if (!invalidRule) {
        errors[property as TField] = { isInvalid: false, message: '' };
      }
    }

    return { isValid, errors };
  };

  validateRule = (
    property: TField,
    rule: ValidationRule,
    fields: Record<TField, unknown>
  ): string | void => {
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
        const compareProperty = rule[1] as TField;
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
        logger.warn(`Validation rule not supported: ${ruleType as string}`);
        return;
      }
    }
  };
}
