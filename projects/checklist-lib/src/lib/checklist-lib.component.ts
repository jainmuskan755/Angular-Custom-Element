import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApplicationService } from './services/application.service';
import { HttpErrorResponse } from '@angular/common/http';
import { slug } from './constants/slugs';
import { LoaderService } from './services/loader.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'lib-checklist-lib',
  templateUrl: './checklist-lib.component.html',
  styleUrls: ['./checklist-lib.component.css']
})
export class ChecklistLibComponent implements OnInit {

  checkListForm:FormGroup;
  checkListDetails:any;
  isSubmitted = false;
  message ='';

  get question_arr() { return this.checkListForm.get('all_required_made')['controls']['options'] as FormArray; }
  get extra_param_annual_arr() { return this.checkListForm.get('reduction_claimed')['controls']['annual']['controls']['extra_params'] as FormArray; }
  get extra_param_quarterly_arr() { return this.checkListForm.get('reduction_claimed')['controls']['quarterly']['controls']['extra_params'] as FormArray; }


  constructor( private formBuilder: FormBuilder
              , private api: ApplicationService
              , private el: ElementRef
              , private cdr: ChangeDetectorRef
              ,private loaderService: LoaderService
    ) {

     }

  ngOnInit(): void {
    this.initializeForm();
  }

  getData(){
    this.loaderService.showLoader();
    let params = {
      appid : 256489
    };
    this.api.makeServerCall(params, '/api/v1/'+slug.GET_SERVICE_CHECKLIST).subscribe((res: any) => {
      if (res.code === 200) {
        let resultData = res.result.checklist;
        // console.log('this.checkListDetails',this.checkListDetails);
        if( resultData != null ){
          this.checkListDetails = JSON.parse( resultData);
          this.patchTheForm();
          this.cdr.detectChanges();
          this.loaderService.hideLoader();
        } else{
          this.message = 'No Checklist Data Available';
        }
        
      }
    }, (err: HttpErrorResponse) => {
      console.log('Error is:', err);
    });
    
    
  }

  initializeForm() {
    this.checkListForm = this.formBuilder.group({
      ppp_loan_draw :['', []],
      equal_and_less_150k :['', []],
      generated_3508 : this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      sent_3508 :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      review_3508 :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      form_signed_by_borrower :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      sba_loan_no :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      lender_loan_no :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      borrower_name :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      ein :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      loan_disbursed_date :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      covered_start_date :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      covered_end_date :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      duration_of_covered_period :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      ppp_loan_amount :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      forgiveness_amount :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      all_required_made : this.formBuilder.group({
        label :  ['', []],
        options : this.formBuilder.array([
          this.formBuilder.group({
            question :['',[]],
            value:['',[]],
            readonly : ['',[]],
            required:['',[]],
            input_type:['',[]],
            key:['',[]]
          })
        ])
      }),

      //  $150K OR LESS / Draw 2
      reduction_claimed : this.formBuilder.group({
        is_annual:['', []],
        annual :this.formBuilder.group({
          label: ['', []],
          value: ['', []],
          readonly : ['',[]],
          required:['',[]],
          input_type:['',[]],
          extra_params: this.formBuilder.array([
            this.formBuilder.group({
                  label: ['', []],
                  value: ['', []],
                  readonly : ['',[]],
                  required:['',[]],
                  input_type:['',[]]
              })
          ])
        }),
        quarterly:this.formBuilder.group({
          label: ['', []],
          value: ['', []],
          readonly : ['',[]],
          required:['',[]],
          input_type:['',[]],
          extra_params: this.formBuilder.array([
            this.formBuilder.group({
                  label: ['', []],
                  value: ['', []],
                  readonly : ['',[]],
                  required:['',[]],
                  input_type:['',[]]
              })
          ])
        })
      }),

      // OVER $150K / Draw 1
      confirm_receipt_docs :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      validate_supporting_docs :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      confirm_calculation :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      calculation_of_line_11_14 :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      yodlee_with_no_bank :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),
      no_yodlee_with_bank :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      }),


      // OVER $150K / Draw 2
      confirm_revenue_reduction :this.formBuilder.group({
        label : ['', []],
        value : ['', []],
        readonly : ['',[]],
        required:['',[]],
        input_type:['',[]]
      })
     
    });
  }

  ngAfterViewInit() {
    this.getData();
    // this.checkListDetails = JSON.parse(JSON.stringify(this.data.checklist));
    // this.patchTheForm();
    // this.cdr.detectChanges();
   }

  patchTheForm(){
    this.addQuestionsIfExists(this.checkListDetails);
    this.addExtraParamsIfExists(this.checkListDetails);
    this.checkListForm.patchValue( this.checkListDetails );
  }

  onSubmit(){

    this.isSubmitted = true;
    if (this.checkListForm.invalid) {

      // focus on invalid control
      const invalidControl = this.el.nativeElement.querySelector('input.ng-invalid');
      console.log('invalidControl', invalidControl);
      if (invalidControl) {
        invalidControl.focus();
      }
    }

    if (this.checkListForm.valid) {
      this.enableAllDisabledFields();
      // console.log('this.checkListDetails',JSON.stringify(this.checkListDetails));
      let finalFormValues = this.removeExtraFields( this.checkListForm.value );
      // console.log('this.checkListForm',JSON.stringify(finalFormValues));
      this.makeServiceCallRequest( finalFormValues );
    }
   
  }

  checkIfExtraParamsExists( formData,item,annualOrQuarterly ){
    if( this.checkListDetails[item][annualOrQuarterly]['extra_params'] == undefined ){
      delete formData[item][annualOrQuarterly]['extra_params'];
    }
  }

  removeReductionIfNotExists( formData,item ){
    if( (this.checkListDetails[item] != undefined) 
        && ( formData[item].is_annual != "" ) 
    ){
      if( formData[item]['is_annual'] == 'annual' ){
        this.checkIfExtraParamsExists( formData,item,formData[item]['is_annual']);
        delete formData[item]['quarterly'];
      } else{
        this.checkIfExtraParamsExists( formData,item,formData[item]['is_annual'] );
        delete formData[item]['annual'];
      }
    } else{
      delete formData[item];
    }
    
  }

  removeExtraFields( formData){
    for( let item in formData){
      if( Array.isArray(item)){
        this.removeExtraFields( item);
      } else if( item == 'reduction_claimed' ){
        this.removeReductionIfNotExists(formData,item);
      }else{
        if( formData[item].input_type == ""){
          delete formData[item];
        }
      }
    }

    return formData;
  }

  makeServiceCallRequest( finalFormValues ){
    this.loaderService.showLoader();
    let params={
      appid : 256489,
      login_user_id: 8592,
      service:'widget',
      checklist:finalFormValues
    };
    this.api.makeServerCall(params, '/api/v1/'+slug.SAVE_SERVICE_CHECKLIST).subscribe((res: any) => {
      if (res.status == 'success') {
        this.loaderService.hideLoader();
        // Success Message
      }
    }, (err: HttpErrorResponse) => {
      console.log('Error is:', err);
    });
  }

  enableAllDisabledFields(){
    for (const control in this.checkListForm.controls) {
        this.checkListForm.get(control).enable();
    }
    
  }

  
  addQuestionsIfExists(formdata) {
    if (formdata.all_required_made.label) {
      while (this.question_arr.length < formdata.all_required_made['options'].length) {
        this.addQuestion();
      }
    }
  }

  addQuestion() {
    this.question_arr.push(this.formBuilder.group({
      question :['',[]],
      value:['',[]],
      readonly:['',[]],
      required:['',[]],
      input_type:['',[]],
      key:['',[]]
    }));
  }
  
  addExtraParamsIfExists(formdata) {
    if (  ( formdata.reduction_claimed != undefined ) 
    && (formdata.reduction_claimed.is_annual != undefined)
    ) {
      let annualOrQuarterly = formdata.reduction_claimed.is_annual ;
      let arrayName = this.getArrayNameForExtraParams(annualOrQuarterly);

      if( formdata.reduction_claimed[annualOrQuarterly]['extra_params'] != undefined ){
        while (this[arrayName].length < formdata.reduction_claimed[annualOrQuarterly]['extra_params'].length) {
          this.addExtraParams(arrayName);
        }
      }
      
    }
  }

  getArrayNameForExtraParams( annualOrQuarterly ){
    if( annualOrQuarterly == 'annual'){
      return 'extra_param_annual_arr';
    } else if( annualOrQuarterly == 'quarterly'){
      return 'extra_param_quarterly_arr';
    } 
    
  }

  addExtraParams( arrayName) {
    this[arrayName].push(this.formBuilder.group({
      label :['',[]],
      value:['',[]],
      readonly:['',[]],
      required:['',[]],
      input_type:['',[]]
    }));
  }
  
  data = {
    "checklist": {
      "generated_3508": {
          "label": "3508EZ Generated",
          "input_type": "radio",
          "value": "Yes",
          "readonly": "false",
          "required": "true"
      },
      "sent_3508": {
          "label": "3508EZ Sent",
          "input_type": "radio",
          "value": "Yes",
          "readonly": "false",
          "required": "true"
      },
      "review_3508": {
          "label": "Review 3508EZ",
          "input_type": "radio",
          "value": "",
          "readonly": "false",
          "required": "true"
      },
      "all_required_made": {
          "label": "Confirm all required certifications are made",
          "options": [
              {
                  "question": "The dollar amount for which forgiveness is requested (which does not exceed the principal amount of the PPP loan):<ul style=\"padding-left: 35px;\"><li style=\"padding-left: 10px;\">was used to pay business costs that are eligible for forgiveness (payroll costs to retain employees; business mortgage interest  payments;  business  rent  or  lease  payments;  business  utility  payments;  covered operations  expenditures; covered property damage costs; covered supplier costs; or covered worker protection expenditures);</li><li style=\"padding-left: 10px;\">includes payroll costs equal to at least 60% of the forgiveness amount;  and</li><li style=\"padding-left: 10px;\">for any owner-employee (with an ownership stake of 5% or more) or self-employed individual/general partner, does not exceed 2.5  months’  worth  of  compensation received  during  the  year  used  to  calculate  the  PPP  loan  amount, capped at $20,833 per individual in total across all businesses. </li></ul>",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q1"
              },
              {
                  "question": "I understand that if the funds were knowingly used for unauthorized purposes, the federal government may pursue recovery of loan amounts and/or civil or criminal fraud charges.",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q2"
              },
              {
                  "question": "The Borrower did not reduce salaries or hourly wages of any employee by more than 25 percent for any employee during the Covered Period compared to the most recent quarter before the Covered Period. For purposes of this certification, the term “employee” includes only those employees that did not receive, during any single period during 2019, wages or salary at an annualized rate of pay in an amount more than $100,000.",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q3"
              },
              {
                  "question": "The Borrower has accurately verified the payments for the eligible payroll and nonpayroll costs for which the Borrower is requesting forgiveness.",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q4"
              },
              {
                  "question": "I have submitted to the Lender the required documentation verifying payroll costs, the existence of obligations and service (as applicable) prior to February 15, 2020, and eligible business mortgage interest payments, business rent or lease payments, business utility payments, covered operations expenditures, covered property damage costs, covered supplier costs, and covered worker protection expenditures.",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q5"
              },
              {
                  "question": "If this application is being submitted for a Second Draw PPP Loan, the Borrower used all First Draw PPP Loan amounts on eligible expenses prior to disbursement of the Second Draw PPP Loan.",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q6"
              },
              {
                  "question": "The information provided in this application and the information provided in all supporting documents and forms is true and correct in all material respects. I understand that knowingly making a false statement to obtain forgiveness of an SBA-guaranteed loan is punishable under the law, including 18 U.S.C. 1001 and 3571 by imprisonment of not more than five years and/or a fine of up to $250,000; under 15 U.S.C. 645 by imprisonment of not more than two years and/or a fine of not more than $5,000; and, if submitted to a Federally insured institution, under 18 U.S.C. 1014 by imprisonment of not more than thirty years and/or a fine of not more than $1,000,000.",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q7"
              },
              {
                  "question": "The tax documents I have submitted to the Lender (if applicable) are consistent with those the Borrower has submitted or will submit to the IRS and/or state tax or workforce agency. I also understand, acknowledge, and agree that the Lender can share the tax information with SBA’s authorized representatives, including authorized representatives of the SBA Office of Inspector General, for the purpose of ensuring compliance with PPP requirements and all SBA reviews.",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q8"
              },
              {
                  "question": "I understand, acknowledge, and agree that SBA may request additional information for the purposes of evaluating the Borrower’s eligibility for the PPP loan and for loan forgiveness, and that the Borrower’s failure to provide information requested by SBA may result in a determination that the Borrower was ineligible for the PPP loan or a denial of the Borrower’s loan forgiveness application.",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q9"
              },
              {
                  "question": "The Borrower did not reduce the number of employees or the average paid hours of employees between January 1, 2020 and the end of the Covered Period (other than any reductions that arose from an inability to rehire individuals who were employees on February 15, 2020, if the Borrower was unable to hire similarly qualified employees for unfilled positions on or before December 31, 2020 (or, for a PPP loan made after December 27, 2020, before the last day of the Covered Period), and reductions in an employee’s hours that a borrower offered to restore and were refused).",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q10"
              },
              {
                  "question": "The Borrower was unable to operate between February 15, 2020, and the end of the Covered Period at the same level of business activity as before February 15, 2020 due to compliance with requirements established or guidance issued between March 1, 2020 and December 31, 2020 (or, for a PPP loan made after December 27, 2020, requirements established or guidance issued before the last day of the Covered Period), by the Secretary of Health and Human Services, the Director of the Centers for Disease Control and Prevention, or the Occupational Safety and Health Administration, related to the maintenance of standards of sanitation, social distancing, or any other work or customer safety requirement related to COVID-19.",
                  "input_type": "radio",
                  "value": "Yes",
                  "readonly": "true",
                  "required": "true",
                  "key": "q11"
              }
          ]
      },
      "form_signed_by_borrower": {
          "label": "Form signed by borrower",
          "input_type": "radio",
          "value": "Yes",
          "readonly": "false",
          "required": "true"
      },
      "sba_loan_no": {
          "label": "SBA loan",
          "input_type": "label",
          "value": "2918400476",
          "readonly": "true",
          "required": "false"
      },
      "lender_loan_no": {
          "label": "Itria loan",
          "input_type": "label",
          "value": "0256489",
          "readonly": "true",
          "required": "false"
      },
      "borrower_name": {
          "label": "Borrower Name",
          "input_type": "label",
          "value": "MOCKDATA 9184_00473",
          "readonly": "true",
          "required": "false"
      },
      "ein": {
          "label": "EIN",
          "input_type": "label",
          "value": "******0476",
          "readonly": "true",
          "required": "false"
      },
      "loan_disbursed_date": {
          "label": "Loan Disbursed Date",
          "input_type": "label",
          "value": "05-20-2020",
          "readonly": "true",
          "required": "false"
      },
      "covered_start_date": {
          "label": "Covered Start Date",
          "input_type": "label",
          "value": "05-20-2020",
          "readonly": "true",
          "required": "false"
      },
      "covered_end_date": {
          "label": "Covered End Date",
          "input_type": "label",
          "value": "08-11-2020",
          "readonly": "true",
          "required": "false"
      },
      "duration_of_covered_period": {
          "label": "Duration of Covered Period (In Weeks)",
          "input_type": "label",
          "value": 12,
          "readonly": "true",
          "required": "false"
      },
      "ppp_loan_amount": {
          "label": "Loan Amount",
          "input_type": "label",
          "value": "$ 145000",
          "readonly": "true",
          "required": "false"
      },
      "forgiveness_amount": {
          "label": "Forgiveness Amount",
          "input_type": "label",
          "value": "$ 20",
          "readonly": "true",
          "required": "false"
      },
      "ppp_loan_draw": "2",
      "equal_and_less_150k": "1",
      "reduction_claimed": {
          "is_annual": "quarterly",
          "quarterly": {
              "label": "25% QUARTERLY reduction claimed ",
              "input_type": "radio",
              "value": "Yes",
              "readonly": "false",
              "required": "false"
          }
      }
  }
  };
 
}
