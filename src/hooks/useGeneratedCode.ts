import { useEffect, useState } from 'react';

export type LangVariant = {
  lang: 'curl' | 'javascript' | 'nodejs' | 'python' | 'java' | 'csharp' | 'go';
  variant: string;
  label: string;
};

export const SUPPORTED_LANGS: LangVariant[] = [
  { lang: 'curl', variant: 'curl', label: 'cURL' },
  { lang: 'javascript', variant: 'fetch', label: 'JavaScript (fetch)' },
  { lang: 'javascript', variant: 'xhr', label: 'JavaScript (XHR)' },
  { lang: 'nodejs', variant: 'request', label: 'Node.js (request)' },
  { lang: 'python', variant: 'requests', label: 'Python (requests)' },
  { lang: 'java', variant: 'okhttp', label: 'Java (OkHttp)' },
  { lang: 'csharp', variant: 'restsharp', label: 'C# (RestSharp)' },
  { lang: 'go', variant: 'native', label: 'Go' },
] as const;

export function useGeneratedCode({
  url,
  method,
  headers,
  body,
  selectedLang,
}: {
  url: string;
  method: string;
  headers: { key: string; value: string }[];
  body?: string;
  selectedLang: LangVariant;
}) {
  const [snippet, setSnippet] = useState<string>('');
  const headersKey = headers.map((h) => `${h.key}:${h.value}`).join('|');

  useEffect(() => {
    if (!url || !method) {
      setSnippet('');
      return;
    }

    const generate = () => {
      switch (selectedLang.lang) {
        case 'curl':
          return [
            `curl -X ${method.toUpperCase()} "${url}"`,
            ...headers.filter((h) => h.key && h.value).map((h) => `-H "${h.key}: ${h.value}"`),
            body ? `-d '${body}'` : '',
          ]
            .filter(Boolean)
            .join(' \\\n  ');

        case 'javascript':
          if (selectedLang.variant === 'fetch') {
            return `fetch("${url}", {
  method: "${method.toUpperCase()}",
  headers: {
    ${headers
      .filter((h) => h.key && h.value)
      .map((h) => `"${h.key}": "${h.value}"`)
      .join(',\n    ')}
  }${body ? `,\n  body: ${JSON.stringify(body)}` : ''}
})
.then(res => res.json())
.then(console.log)
.catch(console.error);`;
          } else {
            // xhr
            return `const xhr = new XMLHttpRequest();
xhr.open("${method.toUpperCase()}", "${url}");
${headers
  .filter((h) => h.key && h.value)
  .map((h) => `xhr.setRequestHeader("${h.key}", "${h.value}");`)
  .join('\n')}
xhr.onload = () => console.log(xhr.responseText);
xhr.onerror = () => console.error(xhr.statusText);
${body ? `xhr.send(${JSON.stringify(body)});` : 'xhr.send();'}`;
          }

        case 'nodejs':
          return `const request = require('request');

request({
  url: "${url}",
  method: "${method.toUpperCase()}",
  headers: {
    ${headers
      .filter((h) => h.key && h.value)
      .map((h) => `"${h.key}": "${h.value}"`)
      .join(',\n    ')}
  }${body ? `,\n  body: ${JSON.stringify(body)}` : ''}
}, (err, res, body) => {
  if (err) console.error(err);
  else console.log(body);
});`;

        case 'python':
          return `import requests

url = "${url}"
headers = {
  ${headers
    .filter((h) => h.key && h.value)
    .map((h) => `"${h.key}": "${h.value}"`)
    .join(',\n  ')}
}
response = requests.request("${method.toUpperCase()}", url, headers=headers${body ? `, data='${body}'` : ''})
print(response.text)`;

        case 'java':
          return `import okhttp3.*;

OkHttpClient client = new OkHttpClient();
Request request = new Request.Builder()
  .url("${url}")
  ${headers
    .filter((h) => h.key && h.value)
    .map((h) => `.addHeader("${h.key}", "${h.value}")`)
    .join('\n  ')}
  .method("${method.toUpperCase()}", ${body ? `RequestBody.create(MediaType.parse("application/json"), "${body}")` : 'null'})
  .build();
Response response = client.newCall(request).execute();
System.out.println(response.body().string());`;

        case 'csharp':
          return `using RestSharp;

var client = new RestClient("${url}");
var request = new RestRequest();
request.Method = Method.${method.toUpperCase()};
${headers
  .filter((h) => h.key && h.value)
  .map((h) => `request.AddHeader("${h.key}", "${h.value}");`)
  .join('\n')}
${body ? `request.AddStringBody("${body}", DataFormat.Json);` : ''}
var response = client.Execute(request);
Console.WriteLine(response.Content);`;

        case 'go':
          return `package main

import (
  "fmt"
  "net/http"
  "strings"
  "io/ioutil"
)

func main() {
  client := &http.Client{}
  req, err := http.NewRequest("${method.toUpperCase()}", "${url}", ${body ? `strings.NewReader("${body}")` : 'nil'})
  if err != nil {
    panic(err)
  }
${headers
  .filter((h) => h.key && h.value)
  .map((h) => `  req.Header.Set("${h.key}", "${h.value}")`)
  .join('\n')}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()
  bodyBytes, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(bodyBytes))
}`;

        default:
          return '// Unsupported language';
      }
    };

    setSnippet(generate());
  }, [url, method, headers, body, selectedLang, headersKey]);

  return snippet;
}
