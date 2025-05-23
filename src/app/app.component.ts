import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgParticlesModule } from 'ng-particles';
import { ClickMode, Container, Engine, HoverMode, ISourceOptions, MoveDirection, OutMode } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgParticlesModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'my-app-name';

    id = "tsparticles";

    particlesUrl = "http://foo.bar/particles.json";

    particlesOptions = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: ClickMode.attract,
                },
                onHover: {
                    enable: false,
                    mode: HoverMode.repulse,
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#868484",
                distance: 100,
                enable: true,
                opacity: 0.1,
                width: 1,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.bounce,
                },
                random: false,
                speed: 0.3,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 500,
                },
                value: 70,
            },
            opacity: {
                value: 0.4,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 8 },
            },
        },
        detectRetina: true,
    };


    particlesLoaded(container: Container): void {
    }

    async particlesInit(engine: Engine): Promise<void> {

        await loadSlim(engine);
    }

}
