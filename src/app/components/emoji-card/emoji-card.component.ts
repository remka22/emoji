import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { IEmoji} from "../../models/IEmoji";

@Component({
  selector: 'app-emoji-card',
  templateUrl: './emoji-card.component.html',
  styleUrls: ['./emoji-card.component.css'],
})
export class EmojiCardComponent {
  @Input() type: string
  @Input() emoji: IEmoji
  @Input() blackList: string[]
  @Input() whiteList: string[]

  @Output() onChanged =  new EventEmitter<boolean>()
  setBlackList(emoji: IEmoji){
    if(this.whiteList.includes(emoji.name)){
      let index = this.whiteList.indexOf(emoji.name)
      this.whiteList.splice(index , 1)
    }
    if(this.blackList.includes(emoji.name)){
      let index = this.blackList.indexOf(emoji.name)
      this.blackList.splice(index, 1)
    }
    else {
      this.blackList.unshift(emoji.name)
    }

    this.onChanged.emit(true)

    localStorage.setItem('blackList', JSON.stringify(this.blackList))
    localStorage.setItem('whiteList', JSON.stringify(this.whiteList))
    // emoji.status = 'deleted'
  }
  setWhiteList(emoji: IEmoji){
    if(this.whiteList.includes(emoji.name)){
      let index = this.whiteList.indexOf(emoji.name)
      this.whiteList.splice(index, 1)
    }
    else {
      this.whiteList.unshift(emoji.name)
    }
    this.onChanged.emit(true)
    localStorage.setItem('whiteList', JSON.stringify(this.whiteList))

    // emoji.status = 'deleted'
  }


}
