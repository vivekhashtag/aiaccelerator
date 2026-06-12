import { compileMDX } from "next-mdx-remote/rsc";
import { Callout, Formula, Figure, StatGrid } from "@/components/lesson/LessonBlocks";
import {
  // 1.1
  ConductivitySpectrum,
  SiliconLattice,
  DopingDiagram,
  PNJunctionDiagram,
  MosfetCrossSection,
  CmosNandSchematic,
  // 1.2
  LogicGateSymbols,
  NandUniversality,
  KMapDiagram,
  // 1.3
  HalfAdderDiagram,
  FullAdderDiagram,
  RippleCarryDiagram,
  Mux2to1Diagram,
  // 1.4
  SRLatchDiagram,
  DFlipFlopTiming,
  ShiftRegisterDiagram,
  FSMTrafficLight,
  // 1.5
  ClockTimingDiagram,
  VoltageScalingChart,
  // 1.6
  BinaryPlaceValue,
  TwosComplementDiagram,
  FloatFormatsDiagram,
  // 1.7
  MacUnitDiagram,
  SystolicArrayDiagram,
  // curriculum-parity backfill
  BJTStructure,
  CarryLookaheadDiagram,
  DemuxDiagram,
  ComparatorDiagram,
  RippleCounterDiagram,
  // 2.1 CPU
  VonNeumannDiagram,
  FetchExecuteCycle,
  PipelineOverlap,
  ForwardingDiagram,
  SimdLanes,
  // 2.2 GPU
  CpuVsGpuCores,
  SimtWarp,
  GpuHierarchy,
  TensorCoreTile,
  WarpLatencyHiding,
  // 2.3 FPGA
  LutDiagram,
  FpgaFabric,
  DspBlock,
  ZynqSoC,
  // 2.4 Memory
  MemoryPyramid,
  MemoryWall,
  CoalescingDiagram,
  // 2.5 Roofline
  RooflineDiagram,
  ArithmeticIntensitySpectrum,
  // 2.6 Parallelism
  AmdahlCurve,
  ParallelismTypes,
  MicroBatchPipeline,
} from "@/components/lesson/Diagrams";

const components = {
  Callout,
  Formula,
  Figure,
  StatGrid,
  // Hand-drawn SVG diagrams (the course "images")
  ConductivitySpectrum,
  SiliconLattice,
  DopingDiagram,
  PNJunctionDiagram,
  MosfetCrossSection,
  CmosNandSchematic,
  LogicGateSymbols,
  NandUniversality,
  KMapDiagram,
  HalfAdderDiagram,
  FullAdderDiagram,
  RippleCarryDiagram,
  Mux2to1Diagram,
  SRLatchDiagram,
  DFlipFlopTiming,
  ShiftRegisterDiagram,
  FSMTrafficLight,
  ClockTimingDiagram,
  VoltageScalingChart,
  BinaryPlaceValue,
  TwosComplementDiagram,
  FloatFormatsDiagram,
  MacUnitDiagram,
  SystolicArrayDiagram,
  BJTStructure,
  CarryLookaheadDiagram,
  DemuxDiagram,
  ComparatorDiagram,
  RippleCounterDiagram,
  // Module 2
  VonNeumannDiagram,
  FetchExecuteCycle,
  PipelineOverlap,
  ForwardingDiagram,
  SimdLanes,
  CpuVsGpuCores,
  SimtWarp,
  GpuHierarchy,
  TensorCoreTile,
  WarpLatencyHiding,
  LutDiagram,
  FpgaFabric,
  DspBlock,
  ZynqSoC,
  MemoryPyramid,
  MemoryWall,
  CoalescingDiagram,
  RooflineDiagram,
  ArithmeticIntensitySpectrum,
  AmdahlCurve,
  ParallelismTypes,
  MicroBatchPipeline,
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
    },
  });
  return content;
}
