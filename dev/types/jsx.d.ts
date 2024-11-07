  declare namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      a: {
        href?: string;
        target?: string;
        download?: string;
        rel?: string;
        media?: string;
        hrefLang?: string;
        type?: string;
        [prop: string]: any;
      };
      abbr: {
        title?: string;
        [prop: string]: any;
      };
      address: {
        [prop: string]: any;
      };
      area: {
        alt?: string;
        coords?: string;
        download?: string;
        href?: string;
        hrefLang?: string;
        media?: string;
        rel?: string;
        shape?: string;
        target?: string;
        [prop: string]: any;
      };
      article: {
        [prop: string]: any;
      };
      aside: {
        [prop: string]: any;
      };
      audio: {
        src?: string;
        autoplay?: boolean;
        controls?: boolean;
        loop?: boolean;
        muted?: boolean;
        preload?: string;
        [prop: string]: any;
      };
      b: {
        [prop: string]: any;
      };
      base: {
        href?: string;
        target?: string;
        [prop: string]: any;
      };
      bdi: {
        dir?: string;
        [prop: string]: any;
      };
      bdo: {
        dir?: string;
        [prop: string]: any;
      };
      blockquote: {
        cite?: string;
        [prop: string]: any;
      };
      body: {
        onafterprint?: () => void;
        onbeforeprint?: () => void;
        onbeforeunload?: (event: BeforeUnloadEvent) => void;
        onhashchange?: (event: HashChangeEvent) => void;
        onlanguagechange?: (event: Event) => void;
        onmessage?: (event: MessageEvent<any>) => void;
        onoffline?: (event: Event) => void;
        ononline?: (event: Event) => void;
        onpagehide?: (event: PageTransitionEvent) => void;
        onpageshow?: (event: PageTransitionEvent) => void;
        onpopstate?: (event: PopStateEvent) => void;
        onrejectionhandled?: (event: PromiseRejectionEvent) => void;
        onstorage?: (event: StorageEvent) => void;
        onunhandledrejection?: (event: PromiseRejectionEvent) => void;
        onunload?: (event: Event) => void;
        [prop: string]: any;
      };
      br: {
        [prop: string]: any;
      };
      button: {
        disabled?: boolean;
        form?: string;
        formaction?: string;
        formenctype?: string;
        formmethod?: string;
        formnovalidate?: boolean;
        formtarget?: string;
        name?: string;
        type?: string;
        value?: string;
        [prop: string]: any;
      };
      canvas: {
        width?: number | string;
        height?: number | string;
        [prop: string]: any;
      };
      caption: {
        [prop: string]: any;
      };
      cite: {
        [prop: string]: any;
      };
      code: {
        [prop: string]: any;
      };
      col: {
        span?: number;
        [prop: string]: any;
      };
      colgroup: {
        span?: number;
        [prop: string]: any;
      };
      data: {
        value?: string;
        [prop: string]: any;
      };
      datalist: {
        [prop: string]: any;
      };
      dd: {
        [prop: string]: any;
      };
      del: {
        cite?: string;
        datetime?: string;
        [prop: string]: any;
      };
      details: {
        open?: boolean;
        [prop: string]: any;
      };
      dfn: {
        title?: string;
        [prop: string]: any;
      };
      dialog: {
        open?: boolean;
        [prop: string]: any;
      };
      div: {
        [prop: string]: any;
      };
      dl: {
        [prop: string]: any;
      };
      dt: {
        [prop: string]: any;
      };
      em: {
        [prop: string]: any;
      };
      embed: {
        src?: string;
        type?: string;
        width?: number | string;
        height?: number | string;
        [prop: string]: any;
      };
      fieldset: {
        disabled?: boolean;
        form?: string;
        name?: string;
        [prop: string]: any;
      };
      figcaption: {
        [prop: string]: any;
      };
      figure: {
        [prop: string]: any;
      };
      footer: {
        [prop: string]: any;
      };
      form: {
        acceptCharset?: string;
        action?: string;
        autocomplete?: string;
        enctype?: string;
        method?: string;
        name?: string;
        noValidate?: boolean;
        target?: string;
        [prop: string]: any;
      };
      h1: {
        [prop: string]: any;
      };
      h2: {
        [prop: string]: any;
      };
      h3: {
        [prop: string]: any;
      };
      h4: {
        [prop: string]: any;
      };
      h5: {
        [prop: string]: any;
      };
      h6: {
        [prop: string]: any;
      };
      head: {
        [prop: string]: any;
      };
      header: {
        [prop: string]: any;
      };
      hgroup: {
        [prop: string]: any;
      };
      hr: {
        [prop: string]: any;
      };
      html: {
        xmlns?: string;
        [prop: string]: any;
      };
      i: {
        [prop: string]: any;
      };
      iframe: {
        src?: string;
        srcdoc?: string;
        name?: string;
        sandbox?: string;
        allow?: string;
        allowfullscreen?: boolean;
        width?: number | string;
        height?: number | string;
        referrerPolicy?: string;
        [prop: string]: any;
      };
      img: {
        src?: string;
        alt?: string;
        crossOrigin?: string;
        height?: number | string;
        isMap?: boolean;
        loading?: 'eager' | 'lazy';
        referrerPolicy?: string;
        sizes?: string;
        src?: string;
        srcSet?: string;
        useMap?: string;
        width?: number | string;
        [prop: string]: any;
      };
      input: {
        accept?: string;
        alt?: string;
        autoComplete?: string;
        autoFocus?: boolean;
        capture?: string;
        checked?: boolean;
        disabled?: boolean;
        form?: string;
        formAction?: string;
        formEncType?: string;
        formMethod?: string;
        formNoValidate?: boolean;
        formTarget?: string;
        height?: number | string;
        list?: string;
        max?: number | string;
        maxLength?: number;
        min?: number | string;
        minLength?: number;
        multiple?: boolean;
        name?: string;
        pattern?: string;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        size?: number;
        src?: string;
        step?: number | string;
        type?: string;
        value?: string | ReadonlyArray<string>;
        width?: number | string;
        [prop: string]: any;
      };
      ins: {
        cite?: string;
        datetime?: string;
        [prop: string]: any;
      };
      kbd: {
        [prop: string]: any;
      };
      keygen: {
        autoFocus?: boolean;
        challenge?: string;
        disabled?: boolean;
        form?: string;
        keyType?: string;
        keyParams?: string;
        name?: string;
        [prop: string]: any;
      };
      label: {
        form?: string;
        htmlFor?: string;
        [prop: string]: any;
      };
      legend: {
        [prop: string]: any;
      };
      li: {
        value?: number;
        [prop: string]: any;
      };
      link: {
        href?: string;
        rel?: string;
        media?: string;
        hrefLang?: string;
        type?: string;
        sizes?: string;
        [prop: string]: any;
      };
      main: {
        [prop: string]: any;
      };
      map: {
        name?: string;
        [prop: string]: any;
      };
      mark: {
        [prop: string]: any;
      };
      menu: {
        type?: string;
        label?: string;
        [prop: string]: any;
      };
      menuitem: {
        type?: string;
        label?: string;
        icon?: string;
        disabled?: boolean;
        checked?: boolean;
        [prop: string]: any;
      };
      meta: {
        charset?: string;
        content?: string;
        httpEquiv?: string;
        name?: string;
        [prop: string]: any;
      };
      meter: {
        value?: number;
        min?: number;
        max?: number;
        low?: number;
        high?: number;
        optimum?: number;
        [prop: string]: any;
      };
      nav: {
        [prop: string]: any;
      };
      noscript: {
        [prop: string]: any;
      };
      object: {
        data?: string;
        type?: string;
        name?: string;
        form?: string;
        width?: number | string;
        height?: number | string;
        [prop: string]: any;
      };
      ol: {
        reversed?: boolean;
        start?: number;
        type?: '1' | 'a' | 'A' | 'i' | 'I';
        [prop: string]: any;
      };
      optgroup: {
        disabled?: boolean;
        label?: string;
        [prop: string]: any;
      };
      option: {
        disabled?: boolean;
        label?: string;
        selected?: boolean;
        value?: string;
        [prop: string]: any;
      };
      output: {
        for?: string;
        form?: string;
        name?: string;
        [prop: string]: any;
      };
      p: {
        [prop: string]: any;
      };
      param: {
        name?: string;
        value?: string;
        [prop: string]: any;
      };
      picture: {
        [prop: string]: any;
      };
      pre: {
        [prop: string]: any;
      };
      progress: {
        value?: number;
        max?: number;
        [prop: string]: any;
      };
      q: {
        cite?: string;
        [prop: string]: any;
      };
      rp: {
        [prop: string]: any;
      };
      rt: {
        [prop: string]: any;
      };
      ruby: {
        [prop: string]: any;
      };
      s: {
        [prop: string]: any;
      };
      samp: {
        [prop: string]: any;
      };
      script: {
        src?: string;
        type?: string;
        async?: boolean;
        defer?: boolean;
        crossOrigin?: string;
        integrity?: string;
        noModule?: boolean;
        nonce?: string;
        [prop: string]: any;
      };
      section: {
        [prop: string]: any;
      };
      select: {
        autoFocus?: boolean;
        disabled?: boolean;
        form?: string;
        multiple?: boolean;
        name?: string;
        required?: boolean;
        size?: number;
        value?: string | ReadonlyArray<string>;
        [prop: string]: any;
      };
      small: {
        [prop: string]: any;
      };
      source: {
        src?: string;
        type?: string;
        srcSet?: string;
        media?: string;
        sizes?: string;
        [prop: string]: any;
      };
      span: {
        [prop: string]: any;
      };
      strong: {
        [prop: string]: any;
      };
      style: {
        type?: string;
        media?: string;
        dangerouslySetInnerHTML?: {
          __html: string;
        };
        [prop: string]: any;
      };
      sub: {
        [prop: string]: any;
      };
      summary: {
        [prop: string]: any;
      };
      sup: {
        [prop: string]: any;
      };
      table: {
        cellPadding?: number | string;
        cellSpacing?: number | string;
        summary?: string;
        width?: number | string;
        [prop: string]: any;
      };
      tbody: {
        [prop: string]: any;
      };
      td: {
        colSpan?: number;
        headers?: string;
        rowSpan?: number;
        scope?: string;
        [prop: string]: any;
      };
      template: {
        [prop: string]: any;
      };
      textarea: {
        autoFocus?: boolean;
        cols?: number;
        dirname?: string;
        disabled?: boolean;
        form?: string;
        maxLength?: number;
        minLength?: number;
        name?: string;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        rows?: number;
        value?: string;
        wrap?: string;
        [prop: string]: any;
      };
      tfoot: {
        [prop: string]: any;
      };
      th: {
        colSpan?: number;
        headers?: string;
        rowSpan?: number;
        scope?: string;
        [prop: string]: any;
      };
      thead: {
        [prop: string]: any;
      };
      time: {
        dateTime?: string;
        [prop: string]: any;
      };
      title: {
        [prop: string]: any;
      };
      tr: {
        [prop: string]: any;
      };
      track: {
        src?: string;
        kind?: string;
        srclang?: string;
        label?: string;
        default?: boolean;
        [prop: string]: any;
      };
      u: {
        [prop: string]: any;
      };
      ul: {
        [prop: string]: any;
      };
      var: {
        [prop: string]: any;
      };
      video: {
        src?: string;
        autoplay?: boolean;
        controls?: boolean;
        height?: number | string;
        loop?: boolean;
        muted?: boolean;
        playsInline?: boolean;
        poster?: string;
        preload?: string;
        width?: number | string;
        [prop: string]: any;
      };
      wbr: {
        [prop: string]: any;
      };
      [elemName: string]: {
        [prop: string]: any;
      };
      [elemName: string]: any;
    }
  }