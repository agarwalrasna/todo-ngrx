import { Injectable, InjectionToken, Injector } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';

export const MODAL_DATA: InjectionToken<any> = new InjectionToken<any>('MODAL_DATA');

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private injector: Injector, private ngbModal: NgbModal) {
  }

  public show<TData>(component: any, config?: NgbModalConfig): Observable<any> {
    const modalInjector: Injector = this.setupInjector(config);
    const ngbModalConfig: NgbModalOptions = {
      ...config,
      injector: modalInjector,
    };
    const modalRef: NgbModalRef = this.ngbModal.open(component, ngbModalConfig);
    return this.setupResponse(modalRef) as Subject<any>;
  }

  private setupResponse(modalRef: NgbModalRef): Subject<any> {
    const response: Subject<any> = new Subject<any>();
    modalRef.result.then((closeResponse) => response.next(closeResponse)).catch((dismissReason) => response.next({
      closed: false, dismissed: true, result: dismissReason,
    }));
    return response;
  }

  private setupInjector<TData>(config: any): Injector {
    return Injector.create(
      {
        providers: [
          {provide: MODAL_DATA, useValue: config ? config.data : null},
        ],
        parent: this.injector,
      }
    );
  }
}
