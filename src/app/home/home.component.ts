import {Component, OnInit} from '@angular/core';
import {FreedrumService} from '../services/freedrum.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  form: FormGroup;

  constructor(private freedrumService: FreedrumService, private fb: FormBuilder) {
  }

  public connect(): void {
    this.freedrumService.connect();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      number: this.freedrumService.requiredActiveSticks
    });

    this.form.valueChanges.subscribe( value => this.freedrumService.requiredActiveSticks = value);
  }

}
