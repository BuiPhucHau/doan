import { Component } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
 constructor(private router: Router){}

  locations = [
    {
      name:"Curst Gourmet Nguyễn Thị Minh Khai",
      address:"MGallery Saigon, 76-78 Nguyễn Thị Minh Khai, Phường 6, Quận 3, Thành phố Hồ Chí Minh"
    },
    {
      
      name:"Curst Gourmet Trường Sơn",
      address:"Số 01 Trường Sơn, Cư Xá Bắc Hải, P.15, Quận 10"
    },
    
    {
      
      name:"Curst Gourmet Nguyễn Thị Thập",
      address:"45 Nguyễn Thị Thập, P.Tân Hưng, Khu dân cư Him Lam, Quận 7"
    },

    {
      
      name:"Curst Gourmet Ngô Đức Kế",
      address:" 35 Ngô Đức Kế, Phường Bến Nghé, Quận 1"
    },

    {
      
      name:"Curst Gourmet Trường Sơn",
      address:"Số 01 Trường Sơn, Cư Xá Bắc Hải, P.15, Quận 10 "
    },

    {
      
      name:"Curst Gourmet Trần Hưng Đạo",
      address:" 661 Trần Hưng Đạo, Phường 1, Quận 5, Tp. HCM"
    }
   
  ];

  detail(){
    this.router.navigate(['/base/location/detail']);
  }

}
