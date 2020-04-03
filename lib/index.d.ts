declare module "crontab" {
  export class TimeRange {
    public render(): string;
    public every(value: string | number): void;
    public toString(): string;
    constructor(s: TimeSlot, range: string);
  }

  export class TimeSlot {
    public getMin(): number;
    public getMax(): number;
    public getEnum(): string[] | null;
    public render(): string;
    public every(n: string | number): TimeRange | null;
    public on(...args: string[] | number[]): void;
    public at(...args: string[] | number[]): void;
    public in(...args: string[] | number[]): void;
    public between(
      from: string | number,
      to: string | number
    ): TimeRange | null;
    public clear(): void;
    public toString(): string;
    constructor(
      name: string,
      min: number | string,
      max: number | string,
      enumm: (number | string)[],
      value: string
    );
  }

  export class CronCommand {
    public match(pattern: string | RegExp): boolean;
    public toString(): string;
    constructor(command: string);
  }

  export class CronComment {
    public match(pattern: string | RegExp): boolean;
    public toString(): string;
    constructor(command: string);
  }

  export class CronVar {
    constructor(line: string);
    public isValid(): boolean;
    public render(): string;
    public name(c?: string): string;
    public val(c?: string): string;
    public toString(): string;
  }

  export class CronJob {
    public isValid(): boolean;
    public render(): string;
    public renderTime(): string;
    public clear(): void;
    public minute(): TimeSlot | null;
    public hour(): TimeSlot | null;
    public dom(): TimeSlot | null;
    public month(): TimeSlot | null;
    public dow(): TimeSlot | null;
    public command(c?: string): string;
    public comment(c?: string): string;
    public toString(): string;
    constructor(line: string | null, command?: string, comment?: string);
  }

  export type Callback = (err: any, crontab: CronTab) => void;

  export interface JobsOptions {
    command?: string | RegExp;
    comment?: string | RegExp;
    [x: string]: any;
  }

  export interface VarsOptions {
    name?: string;
    val?: string;
    [x: string]: any;
  }

  export class CronTab {
    constructor(user: string, file: string, cb: Callback);
    public jobs(options?: JobsOptions): CronJob[];
    public find(options?: JobsOptions): CronJob[];
    public vars(options?: VarsOptions | string): CronVar[];
    public save(cb?: Callback): void;
    public render(): string;
    public create(
      command: string,
      when?: string | Date,
      comment?: string
    ): CronJob | null;
    public parse(line: string): CronJob | null;
    public remove(jobs: CronJob[]): void;
    public reset(): void;
  }

  export function load(user: string, file: string, cb: Callback): void;
  export function load(user: string, cb: Callback): void;
  export function load(cb: Callback): void;
}
