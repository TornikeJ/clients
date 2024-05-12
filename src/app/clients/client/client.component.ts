import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../clients.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { languageValidator } from '../../../shared/validators/language-validator';
import { phoneValidator } from '../../../shared/validators/phone-validator';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../shared/modal/info/info-modal.component';

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
    private modalService: MatDialog,
  ) {}

  ngOnInit() {
    this.initClient();
    this.activatedRoute.data.subscribe(({ client }) => {
      if (client) {
        this.id = client[0].id;
        client[0].phoneNumber = client[0].phoneNumber.toString();
        this.clientForm.patchValue(client[0]);
        this.getClientImage();
      }
    });
  }

  getClient(): void {
    this.clientNumber =
      this.activatedRoute.snapshot.paramMap.get('clientNumber') || '';
    if (this.clientNumber) {
      this.clientService
        .getClient(+this.clientNumber)
        .subscribe((client: Client[]) => {
          if (client) {
            this.id = client[0].id;
            client[0].phoneNumber = client[0].phoneNumber.toString();
            this.clientForm.patchValue(client[0]);
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
    this.transformRequest();
    const req = {
      ...this.clientForm.value,
      id: this.id,
      clientNumber: this.clientNumber,
    };
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

  private transformRequest() {
    this.clientForm
      .get('phoneNumber')
      ?.setValue(+this.clientForm.get('phoneNumber')?.value);
    this.clientForm
      .get('clientId')
      ?.setValue(+this.clientForm.get('clientId')?.value);
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
}
