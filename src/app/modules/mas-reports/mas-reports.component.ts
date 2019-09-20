import { Component, OnInit } from '@angular/core';

import { VizorService } from '../../services/vizor/vizor.service';

@Component({
  selector: 'app-mas-reports',
  templateUrl: './mas-reports.component.html',
  styleUrls: ['./mas-reports.component.css']
})
export class MasReportsComponent implements OnInit {
  endpointData: any;

  constructor(private vizorService: VizorService) { }

  ngOnInit() {
    this.vizorService.getAPIXToken().subscribe(apixData => {
      console.log(apixData);
      const xAuthorization = 'bearer ' + apixData.access_token;

      this.vizorService.getVizorToken().subscribe(vizorData => {
        const authorization = 'Bearer ' + vizorData.access_token;
        console.log(vizorData);

        this.vizorService.retrieveReturn(authorization, xAuthorization).subscribe(returnData => {
          console.log('returnData', returnData);

          returnData.data.revisions[0].dueDate
            = new Date(returnData.data.revisions[0].dueDate).toLocaleDateString();
          returnData.data.endDate = new Date(returnData.data.endDate).toLocaleDateString();
          this.endpointData = returnData.data;
        });

      });
    });
  }

}
