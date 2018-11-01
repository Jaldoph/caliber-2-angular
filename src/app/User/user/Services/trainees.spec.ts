import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TraineesService } from './trainees.service';
import { Trainee } from '../types/trainee';

describe('ViewAllTraineesService', () => {
  let service: TraineesService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TraineesService],
    imports: [HttpClientTestingModule]
  }));
beforeEach(() => {
    service = TestBed.get(TraineesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a http request and handle returning information',
    inject([HttpTestingController, TraineesService],
      (httpMock: HttpTestingController, vats: TraineesService) => {
        let t: Trainee[];
        vats.getTrainees(2200).subscribe(_ => {
          t = _;
        });
        const req = httpMock.expectOne('http://localhost:9085/all/trainee?batch=2200');
        expect(req.request.method).toEqual('GET');
        const t1 = new Trainee();
        t1.name = 'John Dao';
        t1.email = 'jd@j.com';
        t1.trainingStatus = 'Dropped';
        t1.phoneNumber = '111';
        const t2 = new Trainee();
        t1.name = 'Emily Dao';
        t1.email = 'ed@j.com';
        t1.trainingStatus = 'Signed';
        t1.phoneNumber = '222';
        req.flush([t1, t2]);
      }
    )
  );

  afterEach(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));
});
