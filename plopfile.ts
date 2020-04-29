import { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
    plop.setHelper("ucfirst", text => {
        const firstLetter = text.split("")[0].toUpperCase();
        return firstLetter + text.split("").splice(1).join("");
    });
    plop.setGenerator("module", {
        description: "generate a basic module",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What's the name of your module ?",
            },
        ],

        actions: [
            {
                type: "add",
                path: "src/modules/{{name}}/{{name}}.resolver.ts",
                templateFile: "plop-templates/resolver.add.hbs",
                data: {
                    name: "{{pascalCase name}}",
                },
            },
            {
                type: "add",
                path: "src/modules/{{name}}/{{name}}.model.ts",
                templateFile: "plop-templates/model.add.hbs",
                data: {
                    name: "{{pascalCase name}}",
                },
            },
            {
                type: "add",
                path: "src/modules/{{name}}/{{name}}.schema.ts",
                templateFile: "plop-templates/graphql-schema.add.hbs",
                data: {
                    name: "{{pascalCase name}}",
                },
            },
            {
                type: "add",
                path: "src/modules/{{name}}/{{name}}.service.ts",
                templateFile: "plop-templates/service.add.hbs",
                data: {
                    name: "{{pascalCase name}}",
                },
            },
            {
                type: "add",
                path: "src/modules/{{name}}/index.ts",
                templateFile: "plop-templates/export-module.add.hbs",
            },
        ],
    });
}
