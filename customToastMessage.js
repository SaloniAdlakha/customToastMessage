import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BpCustomToast extends LightningElement {
    @api title = 'Sample Title';
    @api message = 'Sample Message';
    @api variant = 'error';
    @api autoCloseTime = 5000;
    @api autoClose = false;
    @api autoCloseErrorWarning = false;

    variantOptions = [
        { label: 'error', value: 'error' },
        { label: 'warning', value: 'warning' },
        { label: 'success', value: 'success' },
        { label: 'info', value: 'info' },
    ];

    titleChange(event) {
        this.title = event.target.value;
    }

    messageChange(event) {
        this.message = event.target.value;
    }

    variantChange(event) {
        this.variant = event.target.value;
    }

    showNotification() {

        if(ShowToastEvent) {
            
            const evt = new ShowToastEvent({
                title: this.title,
                message: this.message,
                variant: this.variant,
            });

            this.dispatchEvent(evt);

        }
    }

    @api
    showCustomNotice() {
        
        const toastModel = this.template.querySelector('[data-id="toastModel"]');
        toastModel.className = 'toastModel slds-show';
        
        if(this.autoClose === "true")
            if( (this.autoCloseErrorWarning && this.variant !== 'success') || this.variant === 'success' || this.variant === 'error'  ) {
                this.delayTimeout = setTimeout(() => {
                    const toastModel = this.template.querySelector('[data-id="toastModel"]');
                    toastModel.className = 'toastModel slds-hide';
                }, this.autoCloseTime);
                
        }
    }

    @api
    showCustomToast(title, message, variant, autoClose) {
        this.title = title;
        this.message = message;
        this.variant = variant;
        this.autoClose = autoClose;
        this.showCustomNotice();
       
    }
    

    closeModel() {
        const toastModel = this.template.querySelector('[data-id="toastModel"]');
        toastModel.className = 'toastModel slds-hide';
    }

    get mainDivClass() { 
        return 'toast-content slds-notify slds-notify_toast slds-theme_'+this.variant;
      }

    get messageDivClass() { 
        return 'slds-icon_container slds-icon-utility-'+this.variant+' slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top';
    }
    get iconName() {
        return 'utility:'+this.variant;
    }
}
