export interface IModalComponent {
  data: any;
  submitButtonText: string;
  cancelButtonText: string;
  submit(): void;
}
