export interface IModalComponent {
  data: any;
  title: string;
  submitButtonText: string;
  cancelButtonText: string;
  init(): void;
  submit(): void;
  isSubmitAvaliable(): boolean;
}
