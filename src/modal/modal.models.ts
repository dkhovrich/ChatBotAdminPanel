import { Observable } from 'rxjs';

export interface IModalComponent {
  data: any;
  title: string;
  submitButtonText: string;
  cancelButtonText: string;
  toastrSuccessMessageText: string;
  toastrErrorMessageText: string;
  init(): void;
  submit(): Observable<any>;
  isSubmitAvaliable(): boolean;
}
