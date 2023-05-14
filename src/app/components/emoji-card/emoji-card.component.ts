import {Component, Input, Output} from '@angular/core';
import { IEmoji} from "../../models/IEmoji";

@Component({
  selector: 'app-emoji-card',
  templateUrl: './emoji-card.component.html',
  styleUrls: ['./emoji-card.component.css']
})
export class EmojiCardComponent {
  @Input() type: string
  @Input() emoji: IEmoji
  @Input() blackList: string[]
  @Input() whiteList: string[]

  setBlackList(emoji: IEmoji){
    if(this.blackList.includes(emoji.name)){
      let index = this.blackList.indexOf(emoji.name)
      this.blackList.splice(index, 1)
    }
    else {
      this.blackList[this.blackList.length] = emoji.name
    }
    // emoji.status = 'deleted'
  }
  setWhiteList(emoji: IEmoji){
    if(this.whiteList.includes(emoji.name)){
      let index = this.whiteList.indexOf(emoji.name)
      this.whiteList.splice(index, 1)
    }
    else {
      this.whiteList[this.whiteList.length] = emoji.name
    }

    // emoji.status = 'deleted'
  }


}
