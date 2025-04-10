import { TestBed } from '@angular/core/testing';

import { XmlConfigService } from './xml-config.service';

describe('XmlConfigService', () => {
  let service: XmlConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
