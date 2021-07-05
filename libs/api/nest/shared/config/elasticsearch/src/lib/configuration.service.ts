import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  constructor(private configService: ConfigService) {}

  createElasticsearchOptions(): ElasticsearchModuleOptions {
    const node = `http://${this.configService.get<string>(
      'es.host'
    )}:${this.configService.get<string>('es.port')}`;
    return {
      node,
    };
  }
}
