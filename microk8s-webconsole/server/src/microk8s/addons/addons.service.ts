import {Injectable} from '@nestjs/common';
import {safeLoad} from 'js-yaml';
import {from} from 'rxjs';
import {map} from 'rxjs/operators';
import {ShellService} from '../../core/services/shell/shell.service';
import {Addon, MicroK8sOverview} from '@common/graphql.schema';
import {ShellCommands} from '../../core/services/shell/shell-commands';

@Injectable()
export class AddonsService {

  constructor(private shellService: ShellService, private shellCommands: ShellCommands) { }

  async getAll(): Promise<Addon[]> {
    return await from(this.shellService.execCommand(this.shellCommands.mk8sStatus())).pipe(
      map(r => safeLoad(r).addons),
      map(addons => {
        const values: Addon[] = [];
        for (const key in addons) {
          if (addons.hasOwnProperty(key)) {
            values.push({ name: key, enabled: addons[key] === 'enabled' });
          }
        }
        return values;
      }),
    ).toPromise();
  }

    async getMicroK8sOverview(): Promise<MicroK8sOverview> {
        return await from(this.shellService.execCommand(this.shellCommands.mk8sOverview())).pipe(
            map(commandOutput => {
                return {timestamp: new Date().toLocaleString() + '', output: commandOutput};
            }),
        ).toPromise();
    }

  async setAddonStatus(name: string, enabled: boolean, password?: string){
    await this.shellService.execCommand(this.shellCommands.mk8sEnable(name, enabled), password);
  }
}
