import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { FileInfo } from '../../shared/models/file-info.model';
import { UploadSessionResponse } from '../../shared/models/upload-session.model';
import { switchMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class FileService {

    private readonly BASE_URL = environment.apiUrl;

    private readonly FILES_URL =
        `${this.BASE_URL}/api/v1/files`;

    private readonly UPLOAD_SESSION_URL =
        `${this.BASE_URL}/api/v1/uploads/session`;

    constructor(
        private http: HttpClient
    ) {}

    getFiles(): Observable<FileInfo[]> {

        return this.http.get<FileInfo[]>(this.FILES_URL);

    }

    downloadFile(uuid: string) {

  this.http.get<any>(`${this.FILES_URL}/${uuid}`)
    .subscribe(response => {

      const a = document.createElement('a');

      a.href = response.downloadUrl;

      a.target = '_blank';

      a.click();

    });

}

    createUploadSession(file: File) {

        return this.http.post<UploadSessionResponse>(
            this.UPLOAD_SESSION_URL,
            {
                fileName: file.name,
                contentType: file.type,
                fileSize: file.size
            }
        );

    }

    uploadToStorageNode(
        file: File,
        session: UploadSessionResponse
    ) {

        const headers = new HttpHeaders({

            'X-Upload-Token': session.uploadToken,

            'X-File-Name': file.name,

            'Content-Type': file.type

        });

        return this.http.post(

            session.uploadUrl,

            file,

            {

                headers,

                responseType: 'json'

            }

        );

    }

    deleteFile(uuid: string) {

    return this.http
        .delete<any>(`${this.FILES_URL}/${uuid}`)
        .pipe(

            switchMap(response =>

                this.http.delete(response.deleteUrl)

            ),

            switchMap(() =>

                this.http.delete(
                    `${this.FILES_URL}/internal/files/${uuid}`
                )

            ) 

        );

}
}