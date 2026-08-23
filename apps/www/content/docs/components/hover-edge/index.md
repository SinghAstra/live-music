
# Hover Edge

An animated edge effect component that draws a smooth line along any side of its content on hover or focus.

<ComponentPreview name="hover-edge-demo" preview={<HoverEdgeDemo />} />

## Installation

<InstallationTabs 
  cli={
    <pre><code className="language-bash">npx @singhastra/componentx-cli add hover-edge</code></pre>
  }
  manual={
    <Steps>
      <Step title="Copy and paste the code">
        <pre><code className="language-tsx">{`// Create components/ui/hover-edge.tsx and paste the raw code`}</code></pre>
      </Step>
    </Steps>
  }
/>

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Edge position. |
| `origin` | `"start" \| "end"` | `"start"` | Animation origin direction. |
| `thickness` | `number \| string` | `1` | Line thickness. |
| `color` | `string` | `"var(--primary)"` | Line background color. |
| `duration` | `number` | `300` | Transition duration (ms). |
| `active` | `boolean` | `false` | Keeps line permanently visible. |

## Examples

### Active Route State
```tsx
<HoverEdge "/docs"} active="{pathname">
  Documentation
</HoverEdge>

```

### Different Sides & Origins

```tsx
<div className="flex gap-4">
  <HoverEdge origin="end" side="top">Top (From Right)</HoverEdge>
  <HoverEdge side="left" thickness="{3}">Left Edge</HoverEdge>
</div>

```

### Custom Styling

```tsx
<HoverEdge color="#ef4444" duration="{500}" thickness="4px">
  Thick Red Edge
</HoverEdge>

```
