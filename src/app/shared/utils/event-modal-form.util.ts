import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedFormGroup<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
    ? U extends string | number | boolean
      ? FormArray<FormControl<U>>
      : FormArray<FormGroup<TypedFormGroup<U>>>
    : T[K] extends object
      ? FormGroup<TypedFormGroup<T[K]>>
      : FormControl<NonNullable<T[K]>>;
};
