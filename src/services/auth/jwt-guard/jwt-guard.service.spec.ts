import { Test, TestingModule } from '@nestjs/testing';
import { JwtGuardService } from './jwt-guard.service';

describe('JwtGuardService', () => {
  let service: JwtGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtGuardService],
    }).compile();

    service = module.get<JwtGuardService>(JwtGuardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
