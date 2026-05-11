// shared/interfaces/populated-role.interface.ts
export interface PopulatedRole {
  permissions: any[]; // Changed to any[] to avoid legacy Mongoose dependency.
}
