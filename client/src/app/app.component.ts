import { Component } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private toasterService: ToasterService) {

  }

  public toasterconfig: ToasterConfig = new ToasterConfig(
    {
      showCloseButton: false,
      tapToDismiss: true,
      timeout: 4000,
      limit: 4,
      bodyOutputType: 1
    });

}
