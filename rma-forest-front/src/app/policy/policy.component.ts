import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
selector: 'app-policy',
standalone: true,
imports: [
CommonModule,
FormsModule,
MatIconModule,
MatButtonToggleModule
],
templateUrl: './policy.component.html',
styleUrl: './policy.component.scss',
})
export class PolicyComponent {

selectedPolicy: 'sig' | 'stop-work' = 'sig';

}
