import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-info-card',
  templateUrl: './order-info-card.component.html',
  styleUrls: ['./order-info-card.component.css']
})
export class OrderInfoCardComponent implements OnInit {

  portions = [
    {
      "uid": 3,
      "isCancelled": false,
      "dish": {
        "uid": 26,
        "name": "Деруни2",
        "weight": 200.0,
        "price": 80.0,
        "calories": 80,
        "isAvailable": true,
        "photo": "https://res.cloudinary.com/mrsn5/image/upload/v1581435461/3.jpg"
      },
      "quantity": 3,
      "price": 240.0
    },
    {
      "uid": 3,
      "isCancelled": false,
      "dish": {
        "uid": 26,
        "name": "Деруни2",
        "weight": 200.0,
        "price": 80.0,
        "calories": 80,
        "isAvailable": true,
        "photo": "https://res.cloudinary.com/mrsn5/image/upload/v1581435461/3.jpg"
      },
      "quantity": 3,
      "price": 240.0
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
