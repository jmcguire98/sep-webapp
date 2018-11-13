// implementation of alert component and services was based on the following code
// http://jasonwatmore.com/post/2017/06/25/angular-2-4-alert-toaster-notifications

import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from './../domain/models/alert';
import { AlertService } from '../domain/services/alert.service';

@Component({
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }
      // add alert to array
      this.alerts.push(alert);
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
      return 'alert alert-success';
      case AlertType.Error:
      return 'alert alert-danger';
      case AlertType.Info:
      return 'alert alert-info';
      case AlertType.Warning:
      return 'alert alert-warning';
    }
  }
}