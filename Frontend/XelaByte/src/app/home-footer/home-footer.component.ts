import { Component, OnInit } from '@angular/core';
import { HomeResolverService } from '../home-resolver.service';

@Component({
  selector: 'HomeFooter',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss']
})
export class HomeFooterComponent implements OnInit 
{
  constructor(public Resolver: HomeResolverService) { }

  ngOnInit(): void
  {
    
  }

}
