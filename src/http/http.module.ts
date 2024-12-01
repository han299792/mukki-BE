import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule], // HttpModule 등록
  exports: [HttpModule], // 다른 모듈에서도 사용 가능하도록 export
})
export class GlobalHttpModule {}
