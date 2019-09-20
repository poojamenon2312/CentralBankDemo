import { Component, OnInit } from '@angular/core';

import { VizorService } from '../../services/vizor/vizor.service';

@Component({
  selector: 'app-bank-reports',
  templateUrl: './bank-reports.component.html',
  styleUrls: ['./bank-reports.component.css']
})
export class BankReportsComponent implements OnInit {
  files: any[] = [];
  authorization: string;
  xAuthorization: string;
  return: any;

  constructor(private vizorService: VizorService) { }

  ngOnInit() {
    this.vizorService.getAPIXToken().subscribe(apixData => {
      console.log(apixData);
      this.xAuthorization = 'bearer ' + apixData.access_token;

      this.vizorService.getVizorToken().subscribe(vizorData => {
        console.log(vizorData);
        this.authorization = 'Bearer ' + vizorData.access_token;

        this.vizorService.retrieveReturn(this.authorization, this.xAuthorization).subscribe(returnData => {
          console.log('returnData', returnData);

          returnData.data.revisions[0].dueDate
            = new Date(returnData.data.revisions[0].dueDate).toLocaleDateString();
          returnData.data.endDate = new Date(returnData.data.endDate).toLocaleDateString();
          this.return = returnData.data;
        });

      });

    });
  }

  /** Handle changes in file inputs.
   * On the template side, this is hardcoded for now,
   *  but this can be changed once an API is integrated.
   */
  onFileChange(event, index) {
    this.files[index] = event.target.files;
    if (event.target.files.length === 0) {
      this.files[index] = undefined;
    }
    console.log(event);

    if (index === 0) {
      this.vizorService.postData(this.authorization,
        this.xAuthorization, this.files[index][0] as File).subscribe(data =>
          console.log(data));
    }
  }

}
