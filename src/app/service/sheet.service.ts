import { Injectable, Inject } from "@angular/core";
import { ServiceModule, API_CONFIG } from "./service.module";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SongSheet, Song } from "./types/common";
import { Observable } from "rxjs";
import { map, pluck, switchMap } from "rxjs/operators";
import { SongService } from "./song.service";

@Injectable({
  providedIn: ServiceModule
})
export class SheetService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string,
    private songService: SongService
  ) {}

  getSongSheetDetail(id: number): Observable<SongSheet> {
    const params = new HttpParams().set("id", id.toString());
    return this.http
      .get(`${this.uri}/playlist/detail`, { params })
      .pipe(map((res: { playlist: SongSheet }) => res.playlist));
  }

  playSheet(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id).pipe(
      pluck("tracks"),
      switchMap(tracks => this.songService.getSongList(tracks))
    );
  }
}
