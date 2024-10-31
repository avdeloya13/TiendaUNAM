import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxPhotoEditorModule } from "ngx-photo-editor";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxPhotoEditorModule, RouterModule],
    exports: [FormsModule, ReactiveFormsModule, CommonModule, NgxPhotoEditorModule, RouterModule],
})
export class SharedModule{}