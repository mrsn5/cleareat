import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order-page',
  templateUrl: './admin-order-page.component.html',
  styleUrls: ['./admin-order-page.component.css']
})
export class AdminOrderPageComponent implements OnInit {

  fake = [
    {
      "uid": 8,
      "orderTime": "2020-02-18T21:35:00.350+0000",
      "readyTime": null,
      "preferences": null,
      "total": 240.0,
      "paid": 0.0,
      "client": {
        "uid": 7,
        "mail": "admin@gmail.com",
        "fullName": "Admin",
        "phone": "+380980000000"
      },
      "portions": [
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
      ],
      "paymentState": "not_paid",
      "orderState": "in_check"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
