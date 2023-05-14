import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmoji} from "../models/IEmoji";

@Injectable({
  providedIn: 'root'
})

export class EmojiService{
  constructor(private http: HttpClient) {
  }

  getEmojies(): Observable<Object[]>{
    return this.http.get<Object[]>('https://api.github.com/emojis')
  }
}
