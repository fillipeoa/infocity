interface IShowMessages {
  error?: boolean;
  success?: boolean;
}

export class FormStatus {
  submitted: boolean;
  showMessages: IShowMessages;
  errors: string[];
  messages: string[];

  constructor(params?: {submitted?: boolean, showMessages?: IShowMessages, errors?: string[], messages?: string[]}) {
    this.submitted = (params && params.submitted) || false;
    this.showMessages = (params && params.showMessages) || {};
    this.errors = (params && params.errors) || [];
    this.messages = (params && params.messages) || [];
  }

  /**
   * Determines if error messages can be shown
   */
  canShowErrors() {
    if(this.errors && this.errors.length>0){
      for(let i=0;i<this.errors.length;i++){
        if(this.errors[i]=='The given data was invalid.'){
            this.errors[i] = null;
        } else if(this.errors[i]=='The email has already been taken.'){
          this.errors[i] = 'Este email já está em uso.'
        }
      }
    }
    return this.showMessages.error && this.errors && this.errors.length > 0 && !this.submitted;
  }

  /**
   * Determines if success messages can be shown
   */
  canShowSuccess() {
    return this.showMessages.success && this.messages && this.messages.length > 0 && !this.submitted;
  }

  /**
   * Called when the form it's attached to is being submitted
   * Resets the `errors` and `messages` arrays and sets `submitted` to true
   */
  onFormSubmitting() {
    this.errors = this.messages = [];
    this.submitted = true;
  }

  /**
   * Called when the form it's attached to has received a response for it's submit action
   * Sets `submitted` to false, sets and displays error or success messages
   *
   * @param params
   */
  onFormSubmitResponse(params: {success: boolean, messages: string[]}) {
    this.submitted = false;
    if (params.success) {
      this.showMessages.success = true;
      this.messages = params.messages;
    } else {
      this.showMessages.error = true;
      this.errors = params.messages;
    }
  }
}
