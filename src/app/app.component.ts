
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from './service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  active: boolean = false;

  dice1: number = 0;
  dice2: number = 0;
  sum: number = 0;

  logs: string = "";
  Joy: number = 1;
  Mave: number = 1;
  Aditya: number = 1;
  Rahul: number = 1;

  win: string = "";

  constructor(private getService: ServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    let boxes = document.querySelectorAll('.box')

    boxes.forEach((box, i) => {
      if (String(i).length == 1 || (String(i).length == 2 && Number(String(i)[0]) % 2) == 0) {
        box.innerHTML = (100 - i).toString();

      }
      else {
        box.innerHTML = (Number((9 - Number(String(i)[0])).toString() + (String(i)[1])) + 1).toString();
      }
    })
  }



  roll() {




    this.dice1 = (Math.floor(Math.random() * 6) + 1);
    this.dice2 = (Math.floor(Math.random() * 6) + 1);
    if (this.dice1 == this.dice2) {
      this.sum += this.dice1 + this.dice2;


    } else {
      this.sum += this.dice1 + this.dice2
      this.getService.play(this.sum).subscribe(data => {

        if (data.Joy != 100 && data.Aditya != 100 && data.Mave != 100 && data.Rahul != 100) {
          this.sum = 0;
          this.Joy = data.Joy;
          this.Aditya = data.Aditya;
          this.Mave = data.Mave
          this.Rahul = data.Rahul



        }
        else {
          this.Joy = data.Joy;
          this.Aditya = data.Aditya;
          this.Mave = data.Mave
          this.Rahul = data.Rahul
          this.active = true
          new Audio('assets/win.mp3').play()
          this.winner()
        }

      })

    }

  }

  winner() {

    if (this.Joy == 100) {
      this.win = "Joy"
    } else if (this.Mave == 100) {
      this.win = "Mave"
    } else if (this.Aditya == 100) {
      this.win = "Aditya"
    } else {
      this.win = "Rahul"
    }
  }

  restart() {
    this.Joy = 1
    this.Aditya = 1
    this.Mave = 1
    this.Rahul = 1
    this.dice1 = 0
    this.dice2 = 0
    this.active = false

    this.getService.restart().subscribe(data =>
      console.log(data));

  }




}




