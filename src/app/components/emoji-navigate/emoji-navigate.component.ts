import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IEmoji} from "../../models/IEmoji";
import {EmojiService} from "../../services/emoji.service";
import {emojies} from "../../data/emojies";
import {delay, Observable} from "rxjs";

@Component({
  selector: 'app-emoji-navigate',
  templateUrl: './emoji-navigate.component.html',
  styleUrls: ['./emoji-navigate.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmojiNavigateComponent implements OnInit{
  type: string = 'all'
  blackList: string[] = []
  whiteList: string[] = []
  data: IEmoji[] = []
  emojies:IEmoji[] = []
  pagination: number = 10
  search: string = ''


  get runChangeDetection() {
    this.setListEmoji(this.emojies)
    console.log(this.emojies);
    console.log(this.blackList)
    console.log(this.whiteList)
    return true
  }
  constructor(private emojiService: EmojiService) {}

  ngOnInit() {
    console.log('ngOnInit')
    this.emojiService.getEmojies().subscribe(dataRequest => {
      for (const name in dataRequest) {
        let status = ''
        // if(this.blackList.includes(name)){
        //   status = 'deleted'
        // }
        this.data.push({
          name: name,
          image: dataRequest[name].toString(),
          status: status
        })
      }
      this.setListEmoji(this.data)
    })
    console.log(this.data)
  }



  setTypeList(type: string){
    this.type = type
    this.pagination = 10
    this.search = ''
    this.setListEmoji(this.data)
  }

  setPagination(){
    this.pagination+=10
    this.setListEmoji(this.data)
  }

  setListEmoji(data: IEmoji[]){
    let listEmojies= data.filter((emoji,i)=>i<this.pagination)
    switch (this.type){
      case 'all':
        // listEmojies = listEmojies.filter((emoji) => !emoji.status.match("deleted"))this.blackList.includes(name)
        listEmojies = listEmojies.filter((emoji) => !this.blackList.includes(emoji.name))
        break
      case 'favourite':
        listEmojies = listEmojies.filter((emoji) => this.whiteList.includes(emoji.name))
        break
      case 'deleted':
        listEmojies = listEmojies.filter((emoji) => this.blackList.includes(emoji.name))
        break
    }
    listEmojies = listEmojies.filter((emoji) => emoji.name.match(this.search))
    this.emojies = listEmojies
  }

  setSearch(str: string){
    this.search = str
    this.setListEmoji(this.data)
  }


}
