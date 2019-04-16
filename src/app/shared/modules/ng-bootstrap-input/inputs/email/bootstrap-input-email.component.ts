import { Component, Input, OnInit } from '@angular/core';
import { BootstrapInputConfigInterface } from '../../../ng-bootstrap-input/bootstrap-input-config';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { InputComponentInterface } from '../../../ng-bootstrap-input/inputs/input-component-interface';
import { FormValidationService } from '../../../ng-bootstrap-input/form-validation.service';
import { BootstrapFormGroup } from '../../../ng-bootstrap-input/bootstrap-form-group';

@Component( {
    selector: 'app-bootstrap-input-email',
    templateUrl: 'bootstrap-input-email.component.html'
} )

export class BootstrapInputEmailComponent implements InputComponentInterface, OnInit {

    @Input() inputConfig: BootstrapInputConfigInterface;
    control: FormControl;
    validators: ValidatorFn[] = [];

    maskConfig = null;

    regex = null;

    ngOnInit(): void {
        this.configureInputMask();
        this.buildValidators();
        this.control = new FormControl( null, this.validators );
        this.inputConfig.form.addControl( 'email', this.control );
    }

    constructor( private formValidationService: FormValidationService ) { }

    configureInputMask() {
        if ( this.inputConfig.validationConfig.maskArray ) {
            this.maskConfig.mask = this.inputConfig.validationConfig.maskArray;
        }

        if ( this.inputConfig.validationConfig.maxLength ) {
            this.maskConfig.pipe = this.trimToMaxLength;
        }
    }

    trimToMaxLength( conformedValue: string ): string {
        return conformedValue.substring( 0, this.inputConfig.validationConfig.maxLength );
    }

    buildValidators(): void {

        if ( this.inputConfig.validationConfig.required ) {
            this.validators.push( Validators.required );
        }

        this.validators.push( Validators.email );

        if ( this.inputConfig.validationConfig.maxLength ) {
            this.validators.push( Validators.maxLength( this.inputConfig.validationConfig.maxLength ) );
        }

        if ( this.inputConfig.validationConfig.validationRegex ) {
            this.validators.push( Validators.pattern( this.inputConfig.validationConfig.validationRegex ) );
        } else {
            this.validators.push( Validators.pattern( this.regex ) );
        }
    }

    hasError( fieldName: string, errorName: string ): boolean {
        return this.formValidationService.hasError( this.inputConfig.form, fieldName, errorName );
    }

    isValid( fieldName: string ): boolean {
        return this.formValidationService.isValid( this.inputConfig.form, fieldName );
    }

    getFormControl(): AbstractControl {
        return this.inputConfig.form.controls['email'];
    }
}
