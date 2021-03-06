import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AddonsService } from './addons.service';
import {Addon, MicroK8sOverview} from '@common/graphql.schema';

@Resolver('Addons')
export class AddonsResolvers {

  constructor(private readonly addonsService: AddonsService) {}

  @Query()
  async getAddons(): Promise<Addon[]> {
    return await this.addonsService.getAll();
  }

    @Query('getMicroK8sOverview')
    async getMicroK8sOverview(): Promise<MicroK8sOverview> {
        return await this.addonsService.getMicroK8sOverview();
    }

  @Mutation('setAddonStatus')
  async setAddonStatus(@Args('name') name: string, @Args('enabled') enabled: boolean, @Args('password') password?: string): Promise<Addon>{
    await this.addonsService.setAddonStatus(name, enabled, password);
    const updated: Addon = { name: '', enabled: false};
    updated.name = name;
    updated.enabled = enabled;
    return updated;
  }
}