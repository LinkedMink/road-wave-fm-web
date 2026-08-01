import "google.maps";

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
