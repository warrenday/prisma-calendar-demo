import { GenerateTypescriptOptions } from './types';
import { IntrospectionNamedTypeRef, IntrospectionQuery } from 'graphql';
export interface GenerateResolversResult {
    importHeader: string[];
    body: string[];
}
export declare class TSResolverGenerator {
    protected options: GenerateTypescriptOptions;
    protected introspectionResult: IntrospectionQuery;
    protected importHeader: string[];
    protected resolverInterfaces: string[];
    protected resolverObject: string[];
    protected resolverResult: {
        [name: string]: string[];
    };
    protected contextType: string;
    protected queryType?: IntrospectionNamedTypeRef;
    protected mutationType?: IntrospectionNamedTypeRef;
    protected subscriptionType?: IntrospectionNamedTypeRef;
    constructor(options: GenerateTypescriptOptions, introspectionResult: IntrospectionQuery);
    generate(): Promise<GenerateResolversResult>;
    private generateCustomScalarResolver;
    private generateTypeResolver;
    private generateObjectResolver;
    private getModifier;
    private guessTParent;
    private guessTResult;
    private isRootType;
}
//# sourceMappingURL=typescriptResolverGenerator.d.ts.map