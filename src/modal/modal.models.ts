export interface IModalComponent {
  data: any;
  title: string;
  submitButtonText: string;
  cancelButtonText: string;
  toastrSuccessMessageText: string;
  init(): void;
  submit(): void;
  isSubmitAvaliable(): boolean;
}
