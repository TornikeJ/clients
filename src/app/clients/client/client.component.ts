import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../clients.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { languageValidator } from '../../../shared/validators/language-validator';
import { phoneValidator } from '../../../shared/validators/phone-validator';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../shared/modal/info/info-modal.component';
import { CanDeactivateType } from './can-deactivate.guard';
import { ConfirmModalComponent } from '../../../shared/modal/confirm/confirm-modal.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  clientNumber!: string;
  private id!: string;
  clientForm!: FormGroup;
  genders = [
    { desc: 'Female', value: 'F' },
    { desc: 'Male', value: 'M' },
  ];
  countries = [
    { desc: 'Georgia', value: 'Georgia' },
    { desc: 'Czechia', value: 'Czechia' },
    { desc: 'Germany', value: 'Germany' },
  ];
  imageSrc: any;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: MatDialog
  ) {}

  ngOnInit() {
    this.initClient();
    this.activatedRoute.data.subscribe(({ client }) => {
      if (client && client[0]) {
        this.clientNumber = client[0].clientNumber;
        this.id = client[0].id;
        client[0].phoneNumber = client[0].phoneNumber.toString();
        this.clientForm.patchValue(client[0]);
        this.getClientImage();
      } else {
        this.router.navigate(['clients-list']);
      }
    });
  }

  getClient(): void {
    if (this.clientNumber) {
      this.clientService
        .getClient(+this.clientNumber)
        .subscribe((client: Client[]) => {
          if (client) {
            this.id = client[0].id;
            const resp = {
              ...client[0],
              phoneNumber: client[0].phoneNumber.toString(),
            };
            this.clientForm.patchValue(resp);
            this.getClientImage();
          }
        });
    }
  }

  onSubmit(addClientFormGroup: FormGroup) {
    if (addClientFormGroup.invalid) {
      addClientFormGroup.markAllAsTouched();
      return;
    }
    const req = {
      ...this.clientForm.value,
      id: this.id,
      clientNumber: this.clientNumber,
    };
    this.transformRequest(req);
    this.clientService.updateClient(req).subscribe((result) => {
      if (result) {
        this.clientForm.markAsPristine();
        this.modalService.open(InfoModalComponent, {
          hasBackdrop: true,
          data: {
            title: 'Success',
            message: 'Client was updated successfully',
          },
        });
        this.getClient();
      }
    });
  }

  private transformRequest(request: any) {
    request.phoneNumber = +request.phoneNumber;
    request.clientId = +request.clientId;
  }

  private initClient() {
    this.clientForm = new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        languageValidator(),
      ]),
      surname: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        languageValidator(),
      ]),
      gender: new FormControl<string>(''),
      clientId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      phoneNumber: new FormControl<number | null>(null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        phoneValidator(),
      ]),
      legalAddress: new FormControl<string>('', [Validators.required]),
      legalCountry: new FormControl<string>('', [Validators.required]),
      legalCity: new FormControl<string>('', [Validators.required]),
      factAddress: new FormControl<string>('', [Validators.required]),
      factCountry: new FormControl<string>('', [Validators.required]),
      factCity: new FormControl<string>('', [Validators.required]),
      photo: new FormControl<string>(''),
    });
  }

  handleInputChange(e: any, update?: boolean) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = (e) => {
      const reader = e.target;
      if (reader) {
        this.imageSrc = reader.result;
      }
      const req = {
        id: this.id,
        imageUrl: this.imageSrc,
      };
      if (update) {
        this.clientService.updateImage(req).subscribe();
      } else {
        this.clientService.uploadImage(req).subscribe();
      }
    };

    reader.readAsDataURL(file);
  }

  private getClientImage() {
    this.clientService.getClientImage(this.id).subscribe((result) => {
      if (result) {
        this.imageSrc = result.imageUrl;
      }
    });
  }

  canDeactivate(): CanDeactivateType {
    if (this.clientForm.dirty) {
      const dialogRef = this.modalService.open(ConfirmModalComponent, {
        data: {
          message:
            'Are you sure you want to leave this page? Any unsaved changes will be lost',
        },
      });

      return dialogRef.afterClosed().pipe(map((result) => !!result));
    }
    return true;
  }
}
