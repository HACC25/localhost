import clsx from "clsx";
import PropTypes from "prop-types";
import Button from "~/components/inputs/button";
import PuzzleGroup from "~/components/data-displays/puzzle-group";
import ColoredBlock from "~/components/surfaces/colored-block";
import Node from "~/components/data-displays/node";
import Input from "~/components/inputs/input/input";
import { Form } from "react-router";
import SortablePuzzlePiece from "~/components/surfaces/sortable-puzzle-piece";
import {
	DndContext,
	DragOverlay,
	useSensor,
	useSensors,
	PointerSensor,
} from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";

const propTypes = {
	user: PropTypes.shape({
		type: PropTypes.oneOf(["ADMIN", "VENDOR", "USER"]),
	}),
};

function FormBuilder({ user = {}, ...attributes }) {
	const [items, setItems] = useState(["A", "B", "C"]);
	const [activeId, setActiveId] = useState(null);
	const [overId, setOverId] = useState(null);
	useEffect(() => {
		console.log(overId);
	}, [overId]);
	const sensors = useSensors(useSensor(PointerSensor));
	const formBuilderClassName = clsx(
		"flex size-full min-h-fit gap-2 p-4",
		"bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] bg-repeat dark:bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)]",
	);

	const handleDragEnd = () => {};
	return (
		<DndContext
			sensors={sensors}
			onDragStart={({ active }) => setActiveId(active.id)}
			onDragOver={({ over }) => setOverId(over?.id ?? null)}
			onDragEnd={({ active, over }) => {
				setActiveId(null);
				setOverId(null);
				if (!over) return;
				// handle reorder logic here...
			}}
		>
			<DragOverlay>
				{activeId ? <SortablePuzzlePiece id={activeId} dragOverlay /> : null}
			</DragOverlay>
			<div className={formBuilderClassName} {...attributes}>
				<ColoredBlock
					fillType="border"
					className="sticky top-4 flex h-full w-90 flex-col gap-6 rounded-lg bg-white p-4 dark:bg-black"
				>
					{/* if element is selected, switch this out with the fields corresponding to that element */}
					<span className="text-center font-bold text-black dark:text-white">
						Components
					</span>
					<div className="flex flex-col gap-2">
						<span className="inline-flex justify-center text-center font-bold text-black dark:text-white">
							<span className="font-symbols">dataset</span>Section
						</span>
						<SortablePuzzlePiece fillType="inverse" color="green">
							<Node type="section">Section</Node>
						</SortablePuzzlePiece>
					</div>
					<div className="flex flex-col gap-2">
						<span className="inline-flex justify-center text-center font-bold text-black dark:text-white">
							<span className="font-symbols">splitscreen_add</span>Row
						</span>
						<SortablePuzzlePiece fillType="inverse" color="yellow">
							<Node type="row">Row</Node>
						</SortablePuzzlePiece>
					</div>

					<div className="flex flex-col gap-2">
						<span className="inline-flex justify-center text-center font-bold text-black dark:text-white">
							<span className="font-symbols">variable_add</span>Input
						</span>
						<SortablePuzzlePiece direction="right">
							<Node>Input</Node>
						</SortablePuzzlePiece>
					</div>
				</ColoredBlock>
				<div className="flex w-full flex-col gap-2 overflow-y-auto">
					<ColoredBlock
						fillType="border"
						className="sticky top-0 flex w-full grow-0 items-center justify-between gap-2 rounded-lg bg-white p-2 dark:bg-black"
					>
						<Button>
							<span className="font-symbols">left_panel_close</span>
							<label>Hide</label>
						</Button>
						<Form method="post">
							<Button type="submit" name="action" value="save">
								<span className="font-symbols">save</span>
								<label>Save</label>
							</Button>
						</Form>
					</ColoredBlock>
					<div className="flex size-full flex-col items-center overflow-y-auto">
						Drop a section here
						<PuzzleGroup direction="down" fillType="inverse" color="green">
							<PuzzleGroup direction="down" fillType="inverse" color="yellow">
								<PuzzleGroup id="ab">
									<Node type="text">Text</Node>
									<Node type="number">Number</Node>
									<Node type="file">File</Node>
									<Node type="array">Array</Node>
									{overId === "ab" && activeId ? "b" : undefined}
								</PuzzleGroup>
								<PuzzleGroup>
									<Node type="text">Text</Node>
									<Node type="number">Number</Node>
								</PuzzleGroup>
							</PuzzleGroup>
							<PuzzleGroup direction="down" fillType="inverse" color="yellow">
								<PuzzleGroup id="ab">
									<Node type="text">Text</Node>
									{overId === "ab" && activeId ? "b" : undefined}
								</PuzzleGroup>
								<PuzzleGroup>
									<Node type="text">Text</Node>
									<Node type="text">Text</Node>
									<Node type="text">Text</Node>
									<Node type="text">Text</Node>
								</PuzzleGroup>
							</PuzzleGroup>
						</PuzzleGroup>
					</div>
				</div>
			</div>
		</DndContext>
	);
}
FormBuilder.propTypes = propTypes;

export default FormBuilder;
