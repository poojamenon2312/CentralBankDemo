import { Component, OnInit } from '@angular/core';

import { VizorService } from '../../services/vizor/vizor.service';

@Component({
  selector: 'app-mas-reports',
  templateUrl: './mas-reports.component.html',
  styleUrls: ['./mas-reports.component.css']
})
export class MasReportsComponent implements OnInit {
  endpointData: any;
  xAuthorization: string; // APIX token
  authorization: string;  // Vizor token
  failedRules: any;

  constructor(private vizorService: VizorService) { }

  ngOnInit() {
    this.vizorService.getAPIXToken().subscribe(apixData => {
      console.log(apixData);
      this.xAuthorization = 'bearer ' + apixData.access_token;

      this.vizorService.getVizorToken().subscribe(vizorData => {
        this.authorization = 'Bearer ' + vizorData.access_token;
        console.log(vizorData);

        this.vizorService.retrieveAllReturns(this.authorization, this.xAuthorization).subscribe(returnData => {
          console.log('returnData', returnData);

          if (returnData) {
            const lastRevisionId = sessionStorage.getItem('lastSavedRevisionId');

            if (lastRevisionId) {
              sessionStorage.setItem('lastSavedRevisionId', undefined);
              sessionStorage.removeItem('lastSavedRevisionId');
            }

            returnData.data[0].revisions[0].dueDate
              = new Date(returnData.data[0].revisions[0].dueDate).toLocaleDateString();
            returnData.data[0].endDate = new Date(returnData.data[0].endDate).toLocaleDateString();
            this.endpointData = returnData.data[0];
          } else {
            const lastRevisionId = sessionStorage.getItem('lastSavedRevisionId');

            if (lastRevisionId) {
              this.vizorService.retrieveReturn(this.authorization, this.xAuthorization, lastRevisionId).subscribe(lastReturnData => {
                lastReturnData.data.revisions[0].dueDate
                  = new Date(lastReturnData.data.revisions[0].dueDate).toLocaleDateString();
                lastReturnData.data.endDate = new Date(lastReturnData.data.endDate).toLocaleDateString();
                this.endpointData = lastReturnData.data;
              });
            }
          }
        });

      });
    });
  }

  /** Send a request to the vizorService's getValidation endpoint. */
  getValidation(revisionId: string): void {
    this.vizorService.getValidation(this.authorization, this.xAuthorization, revisionId).subscribe(validationData => {
      console.log(validationData);

      this.failedRules = validationData.data.failedRules;
    });
  }

}
