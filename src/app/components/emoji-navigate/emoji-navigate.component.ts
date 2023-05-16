import {Component, OnInit} from '@angular/core';
import {IEmoji} from "../../models/IEmoji";
import {EmojiService} from "../../services/emoji.service";

@Component({
  selector: 'app-emoji-navigate',
  templateUrl: './emoji-navigate.component.html',
  styleUrls: ['./emoji-navigate.component.css'],
})
export class EmojiNavigateComponent implements OnInit{
  type: string = 'all'
  blackList: string[] = []
  whiteList: string[] = []
  data: IEmoji[] = []
  emojies:IEmoji[] = []
  pagination: number = 10
  search: string = ''

  onChanged(increased:any){
    this.setListEmoji(this.data)
    console.log("blackList " +localStorage.getItem('blackList'))
    console.log("whiteList " + localStorage.getItem('whiteList'))
    if (this.emojies.length <= 5) {
      this.setPagination()
    }
  }

  constructor(private emojiService: EmojiService) {}

  ngOnInit() {
    for (const blackEm of JSON.parse(localStorage.getItem('blackList') || '[]')) {
      this.blackList.push(blackEm)
    }
    for (const whiteEm of  JSON.parse(localStorage.getItem('whiteList') || '[]')) {
      this.whiteList.push(whiteEm)
    }
    // console.log(this.blackList)
    this.emojiService.getEmojies().subscribe(dataRequest => {
      for (const name in dataRequest) {
        this.data.push({
          name: name,
          image: dataRequest[name].toString()
        })
      }
      this.setListEmoji(this.data)
    })
    // console.log(this.data)
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

    let listEmojies = data.filter((emoji) => emoji.name.match(this.search))

    switch (this.type) {
      case 'all':
        listEmojies = listEmojies.filter((emoji) => !this.blackList.includes(emoji.name))
        break
      case 'favourite':
        listEmojies = listEmojies.filter((emoji) => this.whiteList.includes(emoji.name))
        listEmojies.reverse()
        break
      case 'deleted':
        listEmojies = listEmojies.filter((emoji) => this.blackList.includes(emoji.name))
        listEmojies.reverse()
        break
    }

    listEmojies = listEmojies.filter((emoji, i) => i < this.pagination)

    this.emojies = listEmojies
  }

  setSearch(str: string){
    this.search = str
    this.setListEmoji(this.data)
  }


}
