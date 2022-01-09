import { Component, Inject, OnInit } from '@angular/core';
import { MODAL_DATA } from '../service/modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dailog',
  templateUrl: './confirmation-dailog.component.html',
  styleUrls: ['./confirmation-dailog.component.css']
})
export class ConfirmationDailogComponent implements OnInit {
  public title = 'Delete';
  public message = 'Do you want to delete?';

  constructor(@Inject(MODAL_DATA) public modalData, public modalRef: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

}
