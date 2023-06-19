import { Component, OnInit } from '@angular/core';
import {AssistanceService} from "../../service/assistance/assistance.service";

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.css']
})
export class AssistanceComponent implements OnInit {

  assistances: any[] = [];

  constructor(private assistanceService: AssistanceService) { }

  ngOnInit(): void {
    this.assistanceService.getAllAssistances().subscribe(assistances => {
      this.assistances = assistances;
    });
  }

}
