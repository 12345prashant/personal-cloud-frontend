import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { FileService } from '../../core/services/file.service';
import { FileInfo } from '../../shared/models/file-info.model';

@Component({

    selector: 'app-files',

    standalone: true,

    imports: [
    CommonModule,
    RouterLink,
    FormsModule
],

    templateUrl: './files.component.html'

})
export class FilesComponent implements OnInit {

    files: FileInfo[] = [];

    selectedFile?: File;

    loading = false;

    constructor(
        private fileService: FileService
    ) {
    }

    ngOnInit(): void {

        this.loadFiles();

    }

    onFileSelected(event: any): void {

  this.selectedFile = event.target.files[0];

  }

    loadFiles(): void {

        this.loading = true;

        this.fileService.getFiles().subscribe({

            next: (response) => {

              console.log("Files loaded: " + response);

                this.files = response;

                this.loading = false;

            },

            error: (error) => {

                console.error(error);

                this.loading = false;

            }

        });

    }

    download(file: FileInfo): void {

      console.log("Downloading file: " + file);

    this.fileService.downloadFile(file.fileUuid);

}

    upload(): void {

  if (!this.selectedFile) {

    return;

  }

  this.fileService
      .createUploadSession(this.selectedFile)
      .subscribe({

        next: session => {

          this.fileService
              .uploadToStorageNode(
                  this.selectedFile!,
                  session
              )
              .subscribe({

                next: () => {

                  alert("Upload Successful");

                  this.loadFiles();

                },

                error: err => {

                  console.error(err);

                  alert("Upload Failed");

                }

              });

        },

        error: err => {

          console.error(err);

        }

      });

}

delete(uuid: string) {

  this.fileService.deleteFile(uuid)
      .subscribe(() => {

          this.loadFiles();

      });

}

formatDate(date:string){

return new Date(date).toLocaleString();

}
getFileIcon(type:string){

if(!type){

return 'bi bi-file-earmark';

}

if(type.startsWith('image')){

return 'bi bi-file-earmark-image text-success';

}

if(type.startsWith('video')){

return 'bi bi-file-earmark-play text-danger';

}

if(type.startsWith('audio')){

return 'bi bi-file-earmark-music text-warning';

}

if(type.includes('pdf')){

return 'bi bi-file-earmark-pdf text-danger';

}

if(type.includes('zip')){

return 'bi bi-file-earmark-zip text-dark';

}

if(type.includes('word')){

return 'bi bi-file-earmark-word text-primary';

}

return 'bi bi-file-earmark text-secondary';

}

searchText='';

formatSize(bytes:number):string{

if(bytes<1024){

return bytes+" B";

}

if(bytes<1024*1024){

return (bytes/1024).toFixed(1)+" KB";

}

if(bytes<1024*1024*1024){

return (bytes/(1024*1024)).toFixed(2)+" MB";

}

return (bytes/(1024*1024*1024)).toFixed(2)+" GB";

}

}